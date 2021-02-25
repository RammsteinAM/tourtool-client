import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import enterScoreDialogStyles from './enterScoreDialogStyles';
import EnterScoreDialogScoresConainer from './EnterScoreDialogScoresConainer';
import { StateScore } from '../../types/entities';
import { getNthIndexOf } from '../../utils/arrayUtils';
import toast from '../IndependentSnackbar';
import { getMultipleSetScores } from '../../utils/scoreUtils';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (score1: StateScore, score2: StateScore) => void;
    player1?: string;
    player2?: string;
    gameKey: string;
}

const EnterScoreDialog = ({ open, onClose, onConfirm, player1, player2, gameKey }: Props) => {
    const classes = enterScoreDialogStyles();
    const [score1, setScore1] = useState<StateScore>({});
    const [score2, setScore2] = useState<StateScore>({});
    const entityState = useSelector((state: RootState) => state.entities);
    const [numberOfGames, setNumberOfGames] = useState<number>(entityState.tournament.winningSets || 1);
    const { t } = useTranslation();
    const numberOfGoals = entityState.tournament.numberOfGoals || 7;
    const winningSets = entityState.tournament.winningSets || 1;

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [entityState.games[gameKey]])

    // useEffect(() => {
    //     setNumberOfGames(entityState.tournament.winningSets || 1)
    // }, [entityState.tournament.winningSets])



    const handleConfirm = (e: React.FormEvent) => {
        if (winningSets > 1) {
            const finalScores = getMultipleSetScores(score1, score2, winningSets);
            if (finalScores.score1 < winningSets && finalScores.score2 < winningSets) {
                toast.error(t('less-than-winning-sets-message', { winningSets }))
                return;
            }
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

        setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleClose = () => {
        // setScore1({});
        // setScore2({});
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
            <div className={classes.dialogHeader}>
                <div className={classes.dialogHeaderPlayer}>{player1}</div>
                <div className={classes.dialogHeaderPlayer}>{player2}</div>
            </div>
            {[...Array(numberOfGames).keys()].map(key => {
                return (
                    <EnterScoreDialogScoresConainer
                        key={key}
                        score1={score1[key + 1]}
                        score2={score2[key + 1]}
                        onScoreSelect1={(score) => handleScoreSelectLeft(score, key + 1)}
                        onScoreSelect2={(score) => handleScoreSelectRight(score, key + 1)}
                        disallowTie
                    />
                )
            })
            }
            <DialogActions className={classes.dialogFooter}>
                <Button onClick={handleClose} color="default" size='small' className={classes.dialogButton}>
                    {t('Cancel')}
                </Button>
                <Button onClick={handleConfirm} color="primary" size='small' type='submit' className={`${classes.dialogButton} primary`}>
                    {t('Confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EnterScoreDialog
