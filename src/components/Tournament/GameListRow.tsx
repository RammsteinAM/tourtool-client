import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { FetchedPlayer, Games, StateScore } from '../../types/entities';
import { splitGameKey } from '../../utils/stringUtils';
import { resetGames, updateGames } from '../../redux/tournamentEntities/actions';
import EnterScoreContent from './EnterScore/EnterScoreContent';
import gameListRowStyles from './gameListRowStyles';
import { getMultipleSetScores } from '../../utils/scoreUtils';
import GameListEnterScoreButton from './GameListEnterScoreButton';

interface Props {
    gameKey: string;
    maxScores?: number;
    tabIndex: number;
    normalizedPlayers?: { [id: number]: FetchedPlayer }
}

const GameListRow = ({ gameKey, tabIndex, normalizedPlayers, maxScores = 10 }: Props) => {
    const [games, setGames] = useState<Games>({});
    const [scoresOpen, setScoresOpen] = useState<boolean>(false);
    const [stateChanged, setStateChanged] = useState<boolean>(false);
    const [numberOfAdditionalGames, setNumberOfAdditionalGames] = useState<number>(0);
    const entityState = useSelector((state: RootState) => state.entities);
    const gamesState = useSelector((state: RootState) => state.entities.games);
    const settingsState = useSelector((state: RootState) => state.settings);
    const scoresRef = useRef<any>();
    const enterScoreContentRef = useRef<any>(null);
    const scoreToggleButtonRef = useRef<any>(null);
    // const winningSets = entityState.tournament.sets || 1;
    // const firstRoundGameNumber = Object.keys(games).filter(gameKey => splitGameKey(gameKey).round === 1).length;
    const dispatch = useDispatch();
    const columns = Math.log(Object.keys(games).length + 1) / Math.log(2);
    const classes = gameListRowStyles();
    const { t } = useTranslation();
    const player1Id = gamesState[gameKey]?.player1Id;
    const player2Id = gamesState[gameKey]?.player2Id;
    const player1Name: string = normalizedPlayers && player1Id ?
        (typeof player1Id === 'number' ?
            normalizedPlayers[player1Id].name :
            `${normalizedPlayers[player1Id[0]].name} / ${normalizedPlayers[player1Id[1]].name}`) :
        '';
    const player2Name: string = normalizedPlayers && player2Id ?
        (typeof player2Id === 'number' ?
            normalizedPlayers[player2Id].name :
            `${normalizedPlayers[player2Id[0]].name} / ${normalizedPlayers[player2Id[1]].name}`) :
        '';

    const toggleScoresOpen = () => {
        if (scoresOpen) {
            setScoresOpen(false);
            enterScoreContentRef.current?.blur();
        }
        else {
            setScoresOpen(true);
            enterScoreContentRef.current?.focus();
        }
        setStateChanged(true);
    }

    const closeScores = () => {
        setScoresOpen(false);
        const nextPossibleKeyOfTheRound = `${splitGameKey(gameKey).round}-${splitGameKey(gameKey).gameNumber + 1}`;
        const nextRoundFirstKey = `${splitGameKey(gameKey).round + 1}-1`;
        const nextPossibleRoundToggleButton = document.getElementById(`toggle-score-button-${nextPossibleKeyOfTheRound}`);
        const nextRoundToggleButton = document.getElementById(`toggle-score-button-${nextRoundFirstKey}`);
        enterScoreContentRef.current?.blur();
        nextPossibleRoundToggleButton ? nextPossibleRoundToggleButton?.focus() : nextRoundToggleButton?.focus();
        setStateChanged(true);
    }

    const handleAdditionalGameCount = (n: number) => {
        setNumberOfAdditionalGames(n);
    }

    const handleScoreConfirm = (scores1: StateScore, scores2: StateScore) => {
        const { score1, score2 } = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length)
        const round = splitGameKey(gameKey).round;

        dispatch(updateGames({ [gameKey]: { ...gamesState[gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) } }));
        closeScores();
    }

    const visibleScores = entityState.tournament.numberOfGoals && entityState.tournament.numberOfGoals < maxScores ? entityState.tournament.numberOfGoals + 1 : maxScores;
    if (!normalizedPlayers) {
        return null;
    }

    return (
        <div className={classes.gameRowContainer}>
            <div className={classes.gameRow}>
                <div className={classes.gameRowP1}>{player1Name}</div>
                <button className={classes.scoreContainer} onClick={toggleScoresOpen} type='button' tabIndex={tabIndex} id={`toggle-score-button-${gameKey}`}>
                    <GameListEnterScoreButton
                        scoresOpen={scoresOpen}
                        score1={gamesState[gameKey]?.score1}
                        score2={gamesState[gameKey]?.score2}
                    />
                </button>
                <div className={classes.gameRowP2}>{player2Name}</div>
            </div>
            <div
                className={classes.gameListRowEnterScoreContainer}
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
                        forwardedRef={enterScoreContentRef}
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
