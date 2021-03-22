import React, { useState, useEffect } from 'react'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import EnterScoreScoresConainer from './EnterScoreScoresConainer';
import { Games, EliminationGames, StateScore } from '../../../types/entities';
import { getNthIndexOf, getScoresFromPressedKeys } from '../../../utils/arrayUtils';
import toast from '../../IndependentSnackbar';
import { getMultipleSetScores } from '../../../utils/scoreUtils';
import clsx from 'clsx';
import { splitGameKey } from '../../../utils/stringUtils';
import enterScoreDialogStyles from './enterScoresStyles';

interface Props {
    onClose: () => void;
    onConfirm: (score1: StateScore, score2: StateScore) => void;
    games: Games | EliminationGames;
    gameKey: string;
    visibleScores?: number;
    getNumberOfAdditionalGames?: (n: number) => void;
    forwardedRef?: any;
}

const EnterScoreContent = ({ onClose, onConfirm, games, gameKey, visibleScores, getNumberOfAdditionalGames, forwardedRef }: Props) => {
    const classes = enterScoreDialogStyles();
    const [score1, setScore1] = useState<StateScore>({});
    const [score2, setScore2] = useState<StateScore>({});
    const entityState = useSelector((state: RootState) => state.entities);
    const [numberOfGames, setNumberOfGames] = useState<number>(entityState.tournament.sets || 1);
    const { t } = useTranslation();
    const numberOfGoals = entityState.tournament.numberOfGoals || 7;
    const sets = entityState.tournament.sets || 1;
    let pressedKeys: string[] = [];

    useEffect(() => {
        forwardedRef?.current?.focus()
        if (sets === 1) {
            forwardedRef?.current?.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            forwardedRef?.current?.removeEventListener('keydown', handleKeyDown)
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
            setScore1({ 1: scores[0] });
            setScore2({ 1: scores[1] });
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
        if (sets > 1) {
            const finalScores = getMultipleSetScores(score1, score2, sets);
            if (!entityState.tournament.draw && finalScores.score1 < sets && finalScores.score2 < sets) {
                toast.error(t('less-than-winning-sets-message', { winningSets: sets }))
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
        if (entityState.tournament.draw) {
            return numberOfGames;
        }
        const { score1, score2, winners } = getMultipleSetScores(scores1, scores2, sets);
        let newNumberOfGames = numberOfGames;
        if (score1 < sets && score2 < sets && score1 + score2 === numberOfGames) {
            newNumberOfGames = numberOfGames + 1;
        }
        else if ((score1 >= sets || score2 >= sets)) {
            newNumberOfGames = sets;
            const player1WinningIndex = getNthIndexOf(winners, 1, sets);
            const player2WinningIndex = getNthIndexOf(winners, 2, sets);
            if (score1 < sets) {
                newNumberOfGames += score1;
            }
            if (score2 < sets) {
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
        if (sets === 1) {
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
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - sets);
        numberOfGames !== newNumberOfGames && setNumberOfGames(newNumberOfGames);
        setScore1(stateScore1);
        setScore2(stateScore2);
    }

    const handleScoreSelectRight = (score: number, setNumber: number): void => {
        if (sets === 1) {
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
        getNumberOfAdditionalGames && getNumberOfAdditionalGames(newNumberOfGames - sets);
        numberOfGames !== newNumberOfGames && setNumberOfGames(newNumberOfGames);
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
                [classes.contentFewWinningSets]: sets > 1,
            })}
            onKeyDown={handleContainerKeyDown}
            ref={forwardedRef}
            tabIndex={tabIndex || 0}
        >
            {sets === 1 && <div className={classes.hint}>{t('enter-score-hint-text')}</div>}
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