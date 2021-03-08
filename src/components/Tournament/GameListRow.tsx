import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { Games, StateScore } from '../../types/entities';
import { splitGameKey } from '../../utils/stringUtils';
import { resetGames, updateGames } from '../../redux/tournamentEntities/actions';
import EnterScoreContent from '../../components/Tournament/EnterScoreContent';
import gameListRowStyles from './gameListRowStyles';
import clsx from 'clsx';
import { getMultipleSetScores } from '../../utils/scoreUtils';
import GameListEnterScoreButton from './GameListEnterScoreButton';

interface Props {
    gameKey: string;
    maxScores?: number;
}

const GameListRow = ({ gameKey, maxScores = 10 }: Props) => {
    const [games, setGames] = useState<Games>({});
    const [scoresOpen, setScoresOpen] = useState<boolean>(false);
    const [stateChanged, setStateChanged] = useState<boolean>(false);
    const [numberOfAdditionalGames, setNumberOfAdditionalGames] = useState<number>(0);
    const entityState = useSelector((state: RootState) => state.entities);
    const gamesState = useSelector((state: RootState) => state.entities.games);
    const settingsState = useSelector((state: RootState) => state.settings);
    const scoresRef = useRef<any>();
    const winningSets = entityState.tournament.winningSets || 1;
    const firstRoundGameNumber = Object.keys(games).filter(gameKey => splitGameKey(gameKey).round === 1).length;
    const dispatch = useDispatch();
    const columns = Math.log(Object.keys(games).length + 1) / Math.log(2);
    const classes = gameListRowStyles();
    const { t } = useTranslation();

    // useEffect(() => {

    //     setGames({ ...entityState.eliminationGames })

    // }, [/* entityState.players */])


    const toggleScoresOpen = () => {
        const el = document.getElementById(`enter-score-content-${gameKey}`);
        debugger
        if (scoresOpen) {
            setScoresOpen(false);
            el?.blur();
        }
        else {
            setScoresOpen(true);
            el?.focus();
        }
        setStateChanged(true);
    }

    const closeScores = () => {
        const el = document.getElementById(`enter-score-content-${gameKey}`);
        setScoresOpen(false);
        el?.blur();
        setStateChanged(true);
    }

    const handleAdditionalGameCount = (n: number) => {
        setNumberOfAdditionalGames(n);
    }

    const handleScoreConfirm = (scores1: StateScore, scores2: StateScore) => {
        //if (!gameKey || !player1Name || !player2Name) return;
        const { score1, score2 } = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length)
        const round = splitGameKey(gameKey).round;

        dispatch(updateGames({ [gameKey]: { ...gamesState[gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) } }));
        closeScores();
    }

    const visibleScores = entityState.tournament.numberOfGoals && entityState.tournament.numberOfGoals < maxScores ? entityState.tournament.numberOfGoals + 1 : maxScores;

    return (
        <div className={classes.gameRowContainer}>
            <div className={classes.gameRow}>
                <div className={classes.gameRowP1}>{gamesState[gameKey]?.player1}</div>
                <div className={classes.scoreContainer} onClick={toggleScoresOpen}>
                    <GameListEnterScoreButton
                        scoresOpen={scoresOpen}
                        score1={gamesState[gameKey]?.score1}
                        score2={gamesState[gameKey]?.score2}
                    />
                </div>
                <div className={classes.gameRowP2}>{gamesState[gameKey]?.player2}</div>
            </div>
            <div
                className={classes.gameListRowEnterScoreContainer}
                // className={clsx(classes.gameListRowEnterScoreContainer, {
                //     [classes.gameListRowEnterScoreContainerHidden]: !stateChanged,
                // })}
                style={
                    (scoresOpen ?
                        { maxHeight: `${scoresRef.current?.offsetHeight + numberOfAdditionalGames * 40}px` } :
                        (stateChanged ?
                            { maxHeight: `0px` } :
                            { position: 'fixed', maxHeight: `0px` }
                        )
                    )
                }
            >
                <div ref={scoresRef} className={classes.enterScoreContentContainer}>
                    <EnterScoreContent
                        onClose={closeScores}
                        onConfirm={handleScoreConfirm}
                        gameKey={gameKey}
                        games={entityState.eliminationGames}
                        visibleScores={visibleScores}
                        getNumberOfAdditionalGames={handleAdditionalGameCount}
                    />
                </div>
            </div>
        </div>
    )
}

export default GameListRow
