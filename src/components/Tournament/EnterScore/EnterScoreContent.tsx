import React, { useState, useEffect } from 'react'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import EnterScoreScoresConainer from './EnterScoreScoresConainer';
import { StateScore, FetchedGameData, FetchedTournament } from '../../../types/entities';
import { getNthIndexOf, getScoresFromPressedKeys } from '../../../utils/arrayUtils';
import toast from '../../IndependentSnackbar';
import { getMultipleSetScores } from '../../../utils/scoreUtils';
import clsx from 'clsx';
import enterScoreDialogStyles from './enterScoresStyles';
import SelectWinnerConainer from './SelectWinnerConainer';

interface Props {
    onClose: () => void;
    onConfirm: (score1: StateScore, score2: StateScore) => void;
    game: FetchedGameData;
    gameKey: string;
    tournament: FetchedTournament;
    getNumberOfAdditionalGames?: (n: number) => void;
    forwardedRef?: any;
    playerNames?: { left: string, right: string };
    visibleScores?: number;
}

const EnterScoreContent = ({ onClose, onConfirm, game, tournament, gameKey, getNumberOfAdditionalGames, forwardedRef, visibleScores, playerNames }: Props) => {
    const classes = enterScoreDialogStyles();
    const [score1, setScore1] = useState<StateScore>([]);
    const [score2, setScore2] = useState<StateScore>([]);
    const [numberOfGames, setNumberOfGames] = useState<number>(tournament.sets || 1);
    const { t } = useTranslation();
    const numberOfGoals = tournament.numberOfGoals;
    let pressedKeys: string[] = [];

    useEffect(() => {
        if (tournament.sets === 1) {
            forwardedRef?.current?.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            forwardedRef?.current?.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        const storeScores1 = game.scores1;
        const storeScores2 = game.scores2;
        let numberOfPlayedGames: number = numberOfGames;

        if (storeScores1 && storeScores1?.length > 0) {
            if (!storeScores2 || storeScores2?.length <= storeScores1?.length) {
                numberOfPlayedGames = storeScores1?.length;
            }
        }
        if (storeScores2 && storeScores2?.length > 0) {

            if (!storeScores1 || storeScores1?.length <= storeScores2?.length) {
                numberOfPlayedGames = storeScores2?.length;
            }
        }
        storeScores1 && storeScores1.length > 0 && setScore1(storeScores1);
        storeScores2 && storeScores2.length > 0 && setScore2(storeScores2);
        setNumberOfGames(numberOfPlayedGames);
    }, [game]);

    if (typeof numberOfGoals !== 'number') {
        return null;
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey) {
            return;
        }
        pressedKeys.push(e.key);
        const scores = getScoresFromPressedKeys(pressedKeys);
        if (scores) {
            if (!tournament.draw && scores[0] === scores[1]) {
                pressedKeys = [];
                return;
            }
            setScore1([scores[0]]);
            setScore2([scores[1]]);
            pressedKeys = [];
            return;
        }
        if (pressedKeys.filter(key => key === 'Enter').length > 2) {
            pressedKeys = [];
        }
    }

    const handleContainerKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleConfirm();
        }
    }

    const handleConfirm = () => {
        if (tournament.sets > 1) {
            const finalScores = getMultipleSetScores(score1, score2, tournament.sets);
            if (!tournament.draw && finalScores.score1 < tournament.sets && finalScores.score2 < tournament.sets) {
                toast.error(t('less-than-winning-sets-message', { winningSets: tournament.sets }))
                return;
            }
        }
        else if (typeof score1[0] !== 'number' || typeof score2[0] !== 'number') {
            toast.warning(t('select-both-scores-message'))
            return;
        }
        if (score1 !== null && score2 !== null) {
            onConfirm(score1, score2);
        }
    }

    const getNewNumberOfGames = (scores1: StateScore, scores2: StateScore) => {
        if (tournament.draw) {
            return numberOfGames;
        }
        const { score1, score2, winners } = getMultipleSetScores(scores1, scores2, tournament.sets);
        let newNumberOfGames = numberOfGames;
        if (score1 < tournament.sets && score2 < tournament.sets && score1 + score2 === numberOfGames) {
            newNumberOfGames = numberOfGames + 1;
        }
        else if ((score1 >= tournament.sets || score2 >= tournament.sets)) {
            newNumberOfGames = tournament.sets;
            const player1WinningIndex = getNthIndexOf(winners, 1, tournament.sets);
            const player2WinningIndex = getNthIndexOf(winners, 2, tournament.sets);
            if (score1 < tournament.sets) {
                newNumberOfGames += score1;
            }
            if (score2 < tournament.sets) {
                newNumberOfGames += score2;
            }
            if (player1WinningIndex + 1 !== numberOfGames && player2WinningIndex + 1 !== numberOfGames) {
                newNumberOfGames = player1WinningIndex > player2WinningIndex ? player1WinningIndex + 1 : player2WinningIndex + 1;
            }
        }
        return newNumberOfGames;
    }

    const getNewScores = (scores1: StateScore, scores2: StateScore, numberOfGames: number) => {
        const newScore1: StateScore = [];
        const newScore2: StateScore = [];

        for (let i = 0; i < numberOfGames; i++) {
            newScore1[i] = scores1[i]
            newScore2[i] = scores2[i]
        }
        return { score1: newScore1, score2: newScore2 }
    }

    const handleScoreSelectLeft = (score: number, setNumber: number): void => {
        if (tournament.sets === 1) {
            setScore1([score]);
            if (typeof score2[0] !== 'number' && score < numberOfGoals) {
                setScore2([numberOfGoals]);
            }
            return;
        }
        const newScore1: StateScore = [...score1];
        newScore1[setNumber] = score;
        let newScore2: StateScore = [...score2]
        if (typeof score2[setNumber] !== 'number' && score < numberOfGoals) {
            newScore2[setNumber] = numberOfGoals;
        }
        const newNumberOfGames = getNewNumberOfGames(newScore1, newScore2);
        const { score1: stateScore1, score2: stateScore2 } = getNewScores(newScore1, newScore2, newNumberOfGames);
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - tournament.sets);
        numberOfGames !== newNumberOfGames && setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleScoreSelectRight = (score: number, setNumber: number): void => {
        if (tournament.sets === 1) {
            setScore2([score]);
            if (typeof score2[0] !== 'number' && score < numberOfGoals) {
                setScore1([numberOfGoals]);
            }
            return;
        }

        const newScore2: StateScore = [...score2];
        newScore2[setNumber] = score;
        let newScore1: StateScore = [...score1]
        if (typeof score1[setNumber] !== 'number' && score < numberOfGoals) {
            newScore1[setNumber] = numberOfGoals;
        }
        const newNumberOfGames = getNewNumberOfGames(newScore1, newScore2);
        const { score1: stateScore1, score2: stateScore2 } = getNewScores(newScore1, newScore2, newNumberOfGames);
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - tournament.sets);
        numberOfGames !== newNumberOfGames && setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleWinnerSelectLeft = (setNumber: number): void => {
        if (tournament.sets === 1) {
            setScore1([1]);
            setScore2([0]);            
            return;
        }
        const newScore1: StateScore = [...score1];
        const newScore2: StateScore = [...score2];
        newScore1[setNumber] = 1;
        newScore2[setNumber] = 0;
        const newNumberOfGames = getNewNumberOfGames(newScore1, newScore2);
        const { score1: stateScore1, score2: stateScore2 } = getNewScores(newScore1, newScore2, newNumberOfGames);
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - tournament.sets);
        numberOfGames !== newNumberOfGames && setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleWinnerSelectRight = (setNumber: number): void => {
        if (tournament.sets === 1) {
            setScore2([1]);
            setScore1([0]);
            return;
        }
        const newScore1: StateScore = [...score1];
        const newScore2: StateScore = [...score2];
        newScore2[setNumber] = 1;
        newScore1[setNumber] = 0;
        const newNumberOfGames = getNewNumberOfGames(newScore1, newScore2);
        const { score1: stateScore1, score2: stateScore2 } = getNewScores(newScore1, newScore2, newNumberOfGames);
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - tournament.sets);
        numberOfGames !== newNumberOfGames && setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleTieSelect = (setNumber: number): void => {
        if (tournament.sets === 1) {
            setScore1([1]);
            setScore2([1]);
            return;
        }

        const newScore1: StateScore = [...score1];
        const newScore2: StateScore = [...score2];
        newScore1[setNumber] = 1;
        newScore2[setNumber] = 1;
        const newNumberOfGames = getNewNumberOfGames(newScore1, newScore2);
        const { score1: stateScore1, score2: stateScore2 } = getNewScores(newScore1, newScore2, newNumberOfGames);
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - tournament.sets);
        numberOfGames !== newNumberOfGames && setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleClose = () => {
        onClose()
    }

    const getVisibleScoreNumber = () => {
        let value = 9;
        if (visibleScores) value = visibleScores;
        if (numberOfGoals < value) value = numberOfGoals + 1;
        return value;
    }

    return (
        <div
            className={clsx(classes.content, {
                [classes.contentFewWinningSets]: tournament.sets > 1,
            })}
            onKeyDown={handleContainerKeyDown}
            ref={forwardedRef}
            tabIndex={0}
        >
            {(tournament.sets === 1 && numberOfGoals > 0) && <div className={classes.hint}>{t('enter-score-hint-text')}</div>}
            {numberOfGoals > 0 && [...Array(numberOfGames).keys()].map(key => {
                return (
                    <EnterScoreScoresConainer
                        key={key}
                        score1={score1[key]}
                        score2={score2[key]}
                        onScoreSelect1={(score) => handleScoreSelectLeft(score, key)}
                        onScoreSelect2={(score) => handleScoreSelectRight(score, key)}
                        visibleScores={getVisibleScoreNumber()}
                        numberOfGoals={numberOfGoals}
                        disallowTie={!tournament.draw}
                    />
                )
            })
            }
            {(numberOfGoals === 0 && playerNames) && [...Array(numberOfGames).keys()].map(key => {
                return (
                    <SelectWinnerConainer
                        key={key}
                        score1={score1[key]}
                        score2={score2[key]}
                        onWinnerSelect1={() => handleWinnerSelectLeft(key)}
                        onWinnerSelect2={() => handleWinnerSelectRight(key)}
                        onTieSelect={() => handleTieSelect(key)}
                        player1Name={playerNames.left}
                        player2Name={playerNames.right}
                        disallowTie={!tournament.draw}
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
        props.game === nextProps.game &&
        props.tournament === nextProps.tournament &&
        props.visibleScores === nextProps.visibleScores &&
        props.tournament.numberOfGoals === nextProps.tournament.numberOfGoals
    )
})