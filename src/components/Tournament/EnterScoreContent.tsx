import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import EnterScoreScoresConainer from './EnterScoreScoresConainer';
import { Games, EliminationGames, StateScore } from '../../types/entities';
import { getNthIndexOf, getScoresFromPressedKeys } from '../../utils/arrayUtils';
import toast from '../IndependentSnackbar';
import { getMultipleSetScores } from '../../utils/scoreUtils';
import { EntitiesReducerState } from '../../redux/tournamentEntities/types';
import { withStyles } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import enterScoreDialogStyles from './enterScoresStyles';
import { splitGameKey } from '../../utils/stringUtils';

interface Props {
    onClose: () => void;
    onConfirm: (score1: StateScore, score2: StateScore) => void;
    games: Games | EliminationGames;
    gameKey: string;
    visibleScores?: number;
    getNumberOfAdditionalGames?: (n: number) => void;
}

const EnterScoreContent = ({ onClose, onConfirm, games, gameKey, visibleScores, getNumberOfAdditionalGames }: Props) => {
    const classes = enterScoreDialogStyles();
    const [score1, setScore1] = useState<StateScore>({});
    const [score2, setScore2] = useState<StateScore>({});
    const entityState = useSelector((state: RootState) => state.entities);
    const [numberOfGames, setNumberOfGames] = useState<number>(entityState.tournament.winningSets || 1);
    const { t } = useTranslation();
    const numberOfGoals = entityState.tournament.numberOfGoals || 7;
    const winningSets = entityState.tournament.winningSets || 1;
    let pressedKeys: string[] = [];

    useEffect(() => {
        const el = document.getElementById(`enter-score-content-${gameKey}`);
        el?.focus()
        if (winningSets === 1) {
            el?.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            el?.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        const storeScores1 = games[gameKey]?.scores1;
        const storeScores2 = games[gameKey]?.scores2;
        const scores1: StateScore = {};
        const scores2: StateScore = {};
        let numberOfPlayedGames: number = numberOfGames;

        if (storeScores1) {
            for (let i = 0; i < storeScores1.length; i++) {
                scores1[i + 1] = storeScores1[i];
            }
            if (!storeScores2 || storeScores2.length <= storeScores1.length) {
                numberOfPlayedGames = storeScores1.length;
            }
        }
        if (storeScores2) {
            for (let i = 0; i < storeScores2.length; i++) {
                scores2[i + 1] = storeScores2[i];
            }
            if (!storeScores1 || storeScores1.length <= storeScores2.length) {
                numberOfPlayedGames = storeScores2.length;
            }
        }
        setScore1(scores1);
        setScore2(scores2);
        setNumberOfGames(numberOfPlayedGames);
    }, [games[gameKey]]);
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey) {
            return;
        }
        pressedKeys.push(e.key);
        const scores = getScoresFromPressedKeys(pressedKeys);
        if (scores) {
            if (!entityState.tournament.draw && scores[0] === scores[1]) {
                pressedKeys = [];
                return;
            }
            // debugger
            // setScore1((state) => {
            //     return { 1: scores[0] };
            // })
            // setScore2((state) => {
            //     return { 1: scores[1] };
            // })
            setScore1({ 1: scores[0] });
            setScore2({ 1: scores[1] });
            pressedKeys = [];
            return;
        }
        if (pressedKeys.filter(key => key === 'Enter').length > 2) {
            pressedKeys = [];
        }            
    }
    
    const handleKeyDown2 = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleConfirm();
        }  
    }

    const handleConfirm = () => {
        if (winningSets > 1) {
            const finalScores = getMultipleSetScores(score1, score2, winningSets);
            if (finalScores.score1 < winningSets && finalScores.score2 < winningSets) {
                toast.error(t('less-than-winning-sets-message', { winningSets }))
                return;
            }
        }
        else if (typeof score1[1] !== 'number' || typeof score2[1] !== 'number') {
            toast.warning(t('select-both-scores-message'))
            return;
        }
        if (score1 !== null && score2 !== null) {
            onConfirm(score1, score2);
        }
    }

    const getNewNumberOfGames = (scores1: StateScore, scores2: StateScore) => {
        const { score1, score2, winners } = getMultipleSetScores(scores1, scores2, winningSets);
        let newNumberOfGames = numberOfGames;
        if (score1 < winningSets && score2 < winningSets && score1 + score2 === numberOfGames) {
            newNumberOfGames = numberOfGames + 1;
        }
        else if ((score1 >= winningSets || score2 >= winningSets)) {
            newNumberOfGames = winningSets;
            const player1WinningIndex = getNthIndexOf(winners, 1, winningSets);
            const player2WinningIndex = getNthIndexOf(winners, 2, winningSets);
            if (score1 < winningSets) {
                newNumberOfGames += score1;
            }
            if (score2 < winningSets) {
                newNumberOfGames += score2;
            }
            if (player1WinningIndex + 1 !== numberOfGames && player2WinningIndex + 1 !== numberOfGames) {
                newNumberOfGames = player1WinningIndex > player2WinningIndex ? player1WinningIndex + 1 : player2WinningIndex + 1;
            }
        }
        return newNumberOfGames;
    }

    const getNewScores = (scores1: StateScore, scores2: StateScore, numberOfGames: number) => {
        const newScore1: StateScore = {};
        const newScore2: StateScore = {};

        for (let i = 1; i <= numberOfGames; i++) {
            newScore1[i] = scores1[i]
            newScore2[i] = scores2[i]
        }
        return { score1: newScore1, score2: newScore2 }
    }

    const handleScoreSelectLeft = (score: number, setNumber: number): void => {
        if (winningSets === 1) {
            setScore1({ 1: score });
            if (typeof score2[1] !== 'number' && score < numberOfGoals) {
                setScore2({ 1: numberOfGoals });
            }
            return;
        }
        const newScore1: StateScore = { ...score1, [setNumber]: score }
        let newScore2: StateScore = { ...score2 }
        if (typeof score2[setNumber] !== 'number' && score < numberOfGoals) {
            newScore2 = { ...newScore2, [setNumber]: numberOfGoals }
        }
        const newNumberOfGames = getNewNumberOfGames(newScore1, newScore2);
        const { score1: stateScore1, score2: stateScore2 } = getNewScores(newScore1, newScore2, newNumberOfGames);
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - winningSets);
        setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleScoreSelectRight = (score: number, setNumber: number): void => {
        if (winningSets === 1) {
            setScore2({ 1: score });
            if (typeof score2[1] !== 'number' && score < numberOfGoals) {
                setScore1({ 1: numberOfGoals });
            }
            return;
        }
        const newScore2: StateScore = { ...score2, [setNumber]: score }
        let newScore1: StateScore = { ...score1 }
        if (typeof score1[setNumber] !== 'number' && score < numberOfGoals) {
            newScore1 = { ...newScore1, [setNumber]: numberOfGoals }
        }
        const newNumberOfGames = getNewNumberOfGames(newScore1, newScore2);
        const { score1: stateScore1, score2: stateScore2 } = getNewScores(newScore1, newScore2, newNumberOfGames);
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - winningSets);
        setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleClose = () => {
        // setScore1({});
        // setScore2({});
        onClose()
    }

    const tabIndex = parseFloat(`${splitGameKey(gameKey).round}.${splitGameKey(gameKey).gameNumber}`)

    return (
        <div //className={classes.content}
        className={clsx(classes.content, {
            [classes.contentFewWinningSets]: winningSets > 1,
        })}
        onKeyDown={handleKeyDown2}
        id={`enter-score-content-${gameKey}`} tabIndex={tabIndex || 0} >
            {winningSets === 1 && <div className={classes.hint}>{t('enter-score-hint-text')}</div>}
            {[...Array(numberOfGames).keys()].map(key => {
                return (
                    <EnterScoreScoresConainer
                        key={key}
                        score1={score1[key + 1]}
                        score2={score2[key + 1]}
                        onScoreSelect1={(score) => handleScoreSelectLeft(score, key + 1)}
                        onScoreSelect2={(score) => handleScoreSelectRight(score, key + 1)}
                        visibleScores={visibleScores}
                        disallowTie={!entityState.tournament.draw}
                    />
                )
            })
            }
            <DialogActions className={classes.dialogFooter}>
                <Button onClick={handleClose} color="default" size='small' className={classes.dialogButton}>
                    {t('Cancel')}
                </Button>
                <Button onClick={handleConfirm} color="primary" size='small' className={`${classes.dialogButton} primary`}>
                    {t('Confirm')}
                </Button>
            </DialogActions>
        </div>
    )
}

export default React.memo(EnterScoreContent, (props: Props, nextProps: Props) => {
    return (
        props.gameKey === nextProps.gameKey &&
        props.games === nextProps.games &&
        props.visibleScores === nextProps.visibleScores
    )
})


// export default EnterScoreContent


/* WITH A CLASS COMPONENT */

// const styles = (theme: Styles<any, any>) => ({
//     dialog: {
//         minWidth: "950px",
//         color: '#ffffff',
//         backgroundColor: '#333333',
//         '& .MuiDialogTitle-root': {
//             paddingBottom: 0,
//         }
//     },
//     content: {
//         color: '#ffffff',
//         backgroundColor: '#333333',
//         paddingTop: '20px',
//     },
//     dialogHeader: {
//         paddingTop: '35px',
//     },
//     dialogHeaderPlayer: {
//         display: "inline-block",
//         width: "50%",
//         textAlign: "center",
//         color: "#bdbdbd",
//         fontWeight: 400,
//         fontSize: "16px"
//     },
//     dialogFooter: {
//         borderTop: '1px solid rgba(0, 0, 0, 0.12)',
//         marginTop: '40px',
//     },
//     dialogButton: {
//         color: '#9b9b9b',
//         paddingLeft: '16px',
//         paddingRight: '16px',
//         '&.primary': {
//             color: '#ffffff',
//         }
//     },
//     pointsContainer: {
//         display: "grid",
//         gridTemplateColumns: "calc(50% - 40px) 80px calc(50% - 40px)",
//         padding: "4px 0",
//         userSelect: 'none',
//     },
//     pointsInputContainer: {
//         width: "100%",
//         display: "flex",
//         position: "relative",
//         padding: "0px 24px",
//         margin: "auto",
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     pointsInput: {
//         position: 'relative',
//         overflow: 'hidden',
//         margin: '0 16px',
//         height: '40px',
//     },
//     pointsMiddle: {
//         fontSize: "20px",
//         lineHeight: "28px",
//         textAlign: "center",
//         alignSelf: 'center',
//         display: 'grid',
//         gridTemplateColumns: ' calc(50% - 9px) 18px calc(50% - 9px)',
//         '& span:first-child': {
//             textAlign: 'right',
//         },
//         '& span': {
//             textAlign: 'middle',
//         },
//         '& span:last-child': {
//             textAlign: 'left',
//         }
//     },
//     scoreItem: {
//         position: 'absolute',
//         top: '10px',
//         fontSize: "14px",
//         fontWeight: 200,
//         width: "24px",
//         height: '20px',
//         textAlign: "center",
//         transition: 'left 0.25s cubic-bezier(0.4, 0, 0.25, 0.7), right 0.25s cubic-bezier(0.4, 0, 0.25, 0.7)',
//         padding: "0 3px",
//         marginLeft: "9px",
//         marginRight: "9px",
//         display: "flex",
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: "transparent",
//         cursor: "pointer",
//         zIndex: 8,
//         '&.disabled': {
//             color: '#707070',
//             cursor: 'not-allowed',
//         }
//     },
//     scoreItemSelected: {
//         position: "absolute",
//         height: "30px",
//         width: "30px",
//         backgroundColor: "#e16f3d",
//         top: "5px",
//         borderRadius: "50%",
//         transition: 'left 0.25s cubic-bezier(0.4, 0, 0.25, 0.7), right 0.25s cubic-bezier(0.4, 0, 0.25, 0.7)',
//         zIndex: 5,
//     },
//     iconButtons: {
//         color: '#ffffff',
//         width: '22px',
//         height: '22px',
//     }
// });

// interface State {
//     score1: StateScore,
//     score2: StateScore,
//     numberOfGames: number,
// }

// interface IProps {
//     onClose: () => void;
//     onConfirm: (score1: StateScore, score2: StateScore) => void;
//     gameType: 'elimination' | 'lms' | 'round-robin';
//     gameKey: string;
//     visibleScores?: number;
//     entities: EntitiesReducerState;
//     classes?: any
// }

// let games: Games | EliminationGames;

// // const classes = enterScoreDialogStyles();


// class EnterScoreContentCC extends React.Component<IProps, State> {
//     constructor(props: IProps) {
//         super(props);
//         this.state = {
//             score1: {},
//             score2: {},
//             numberOfGames: props.entities.tournament.winningSets || 1,
//         }
//         switch (props.gameType) {
//             case 'elimination':
//                 games = this.props.entities.eliminationGames
//                 break;
//             case 'lms':
//                 games = this.props.entities.games
//                 break;
//         }
//         this.handleClose = this.handleClose.bind(this);
//         this.handleConfirm = this.handleConfirm.bind(this);
//         this.handleScoreSelectLeft = this.handleScoreSelectLeft.bind(this);
//         this.handleScoreSelectRight = this.handleScoreSelectRight.bind(this);
//     }


//     componentDidMount = () => {
//         const { gameKey } = this.props;
//         const storeScores1 = games[gameKey]?.scores1;
//         const storeScores2 = games[gameKey]?.scores2;
//         const scores1: StateScore = {};
//         const scores2: StateScore = {};
//         let numberOfPlayedGames: number = this.state.numberOfGames;

//         if (storeScores1) {
//             for (let i = 0; i < storeScores1.length; i++) {
//                 scores1[i + 1] = storeScores1[i];
//             }
//             if (!storeScores2 || storeScores2.length <= storeScores1.length) {
//                 numberOfPlayedGames = storeScores1.length;
//             }
//         }
//         if (storeScores2) {
//             for (let i = 0; i < storeScores2.length; i++) {
//                 scores2[i + 1] = storeScores2[i];
//             }
//             if (!storeScores1 || storeScores1.length <= storeScores2.length) {
//                 numberOfPlayedGames = storeScores2.length;
//             }
//         }
//         // setScore1(scores1);
//         // setScore2(scores2);
//         // setNumberOfGames(numberOfPlayedGames)

//         this.setState({
//             score1: scores1,
//             score2: scores2,
//             numberOfGames: numberOfPlayedGames
//         });
//     }

//     shouldComponentUpdate = (nextProps: IProps, nextState: State) => {
//         debugger
//         if (
//             this.props.gameKey === nextProps.gameKey &&
//             this.props.gameType === nextProps.gameType &&
//             this.props.visibleScores === nextProps.visibleScores &&
//             this.props.entities.games[this.props.gameKey]?.score1 === nextProps.entities.games[this.props.gameKey]?.score1 &&
//             this.props.entities.games[this.props.gameKey]?.score2 === nextProps.entities.games[this.props.gameKey]?.score2 &&
//             this.props.entities.games[this.props.gameKey]?.scores1 === nextProps.entities.games[this.props.gameKey]?.scores1 &&
//             this.props.entities.games[this.props.gameKey]?.scores2 === nextProps.entities.games[this.props.gameKey]?.scores2 &&
//             this.state.score1 === nextState.score1 &&
//             this.state.score2 === nextState.score2
//             ) {
//             return false;
//         }
//         return true;
//     }


//     handleConfirm = (e: React.FormEvent) => {
//         const winningSets = this.props.entities.tournament.winningSets || 1;
//         const { score1, score2 } = this.state;
//         if (winningSets > 1) {
//             const finalScores = getMultipleSetScores(this.state.score1, this.state.score2, winningSets);
//             if (finalScores.score1 < winningSets && finalScores.score2 < winningSets) {
//                 //toast.error(t('less-than-winning-sets-message', { winningSets }))
//                 return;
//             }
//         }
//         else if (score1 === null || score2 === null) {
//             //toast.warning(t('select-both-scores-message'))
//             return;
//         }
//         if (score1 !== null && score2 !== null) {
//             this.props.onConfirm(score1, score2);
//         }
//     }

//     getNewNumberOfGames = (scores1: StateScore, scores2: StateScore) => {
//         const winningSets = this.props.entities.tournament.winningSets || 1;
//         const { numberOfGames } = this.state;
//         const { score1, score2, winners } = getMultipleSetScores(scores1, scores2, winningSets);
//         let newNumberOfGames = numberOfGames;
//         if (score1 < winningSets && score2 < winningSets && score1 + score2 === numberOfGames) {
//             newNumberOfGames = numberOfGames + 1;
//         }
//         else if ((score1 >= winningSets || score2 >= winningSets)) {
//             newNumberOfGames = winningSets;
//             const player1WinningIndex = getNthIndexOf(winners, 1, winningSets);
//             const player2WinningIndex = getNthIndexOf(winners, 2, winningSets);
//             if (score1 < winningSets) {
//                 newNumberOfGames += score1;
//             }
//             if (score2 < winningSets) {
//                 newNumberOfGames += score2;
//             }
//             if (player1WinningIndex + 1 !== numberOfGames && player2WinningIndex + 1 !== numberOfGames) {
//                 newNumberOfGames = player1WinningIndex > player2WinningIndex ? player1WinningIndex + 1 : player2WinningIndex + 1;
//             }
//         }
//         return newNumberOfGames;
//     }

//     getNewScores = (scores1: StateScore, scores2: StateScore, numberOfGames: number) => {
//         const newScore1: StateScore = {};
//         const newScore2: StateScore = {};

//         for (let i = 1; i <= numberOfGames; i++) {
//             newScore1[i] = scores1[i]
//             newScore2[i] = scores2[i]
//         }
//         return { score1: newScore1, score2: newScore2 }
//     }

//     handleScoreSelectLeft = (score: number, setNumber: number) => {
//         const winningSets = this.props.entities.tournament.winningSets || 1;
//         const numberOfGoals = this.props.entities.tournament.numberOfGoals || 7;
//         const { score1, score2 } = this.state;
//         if (winningSets === 1) {
//             this.setState({ score1: { 1: score } }); //setScore1({ 1: score });
//             if (typeof score2[1] !== 'number' && score < numberOfGoals) {
//                 //setScore2({ 1: numberOfGoals });
//                 this.setState({ score2: { 1: numberOfGoals } });
//             }
//             return;
//         }
//         const newScore1: StateScore = { ...score1, [setNumber]: score }
//         let newScore2: StateScore = { ...score2 }
//         if (typeof score2[setNumber] !== 'number' && score < numberOfGoals) {
//             newScore2 = { ...newScore2, [setNumber]: numberOfGoals }
//         }
//         const newNumberOfGames = this.getNewNumberOfGames(newScore1, newScore2);
//         const { score1: stateScore1, score2: stateScore2 } = this.getNewScores(newScore1, newScore2, newNumberOfGames);

//         this.setState({
//             score1: stateScore1,
//             score2: stateScore2,
//             numberOfGames: newNumberOfGames
//         });
//     }

//     handleScoreSelectRight(score: number, setNumber: number) {

//         const winningSets = this.props.entities.tournament.winningSets || 1;
//         const numberOfGoals = this.props.entities.tournament.numberOfGoals || 7;
//         const { score1, score2 } = this.state;
//         if (winningSets === 1) {
//             this.setState({
//                 score2: { 1: score }
//             });
//             if (typeof score2[1] !== 'number' && score < numberOfGoals) {
//                 this.setState({
//                     score1: { 1: numberOfGoals }
//                 });
//             }
//             return;
//         }
//         const newScore2: StateScore = { ...score2, [setNumber]: score }
//         let newScore1: StateScore = { ...score1 }
//         if (typeof score1[setNumber] !== 'number' && score < numberOfGoals) {
//             newScore1 = { ...newScore1, [setNumber]: numberOfGoals }
//         }
//         const newNumberOfGames = this.getNewNumberOfGames(newScore1, newScore2);
//         const { score1: stateScore1, score2: stateScore2 } = this.getNewScores(newScore1, newScore2, newNumberOfGames);

//         this.setState({
//             score1: stateScore1,
//             score2: stateScore2,
//             numberOfGames: newNumberOfGames
//         });
//     }

//     handleClose() {
//         // setScore1({});
//         // setScore2({});
//         this.props.onClose()
//     }

//     render() {
//         const { classes } = this.props;
//         const { score1, score2 } = this.state;
//         return (
//             <div className={classes.content}>
//                 {[...Array(this.state.numberOfGames).keys()].map(key => {
//                     return (
//                         <EnterScoreScoresConainer
//                             key={key}
//                             score1={score1[key + 1]}
//                             score2={score2[key + 1]}
//                             onScoreSelect1={(score) => this.handleScoreSelectLeft(score, key + 1)}
//                             onScoreSelect2={(score) => this.handleScoreSelectRight(score, key + 1)}
//                             visibleScores={this.props.visibleScores}
//                             disallowTie
//                         />
//                     )
//                 })
//                 }
//                 <DialogActions className={classes.dialogFooter}>
//                     <Button onClick={this.handleClose} color="default" size='small' className={classes.dialogButton}>
//                         {/* {t('Cancel')} */} Cancel
//                     </Button>
//                     <Button onClick={this.handleConfirm} color="primary" size='small' type='submit' className={`${classes.dialogButton} primary`}>
//                         {/* {t('Confirm')} */} Confirm
//                     </Button>
//                 </DialogActions>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state: RootState) => ({ entities: state.entities })

// export default connect(mapStateToProps)(withStyles(styles as any)(EnterScoreContentCC))
