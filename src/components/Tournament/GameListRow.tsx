import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FetchedPlayer, GameUpdateReqData, StateScore } from '../../types/entities';
import { splitGameKey } from '../../utils/stringUtils';
import EnterScoreContent from './EnterScore/EnterScoreContent';
import gameListRowStyles from './gameListRowStyles';
import { getMultipleSetScores } from '../../utils/scoreUtils';
import GameListEnterScoreButton from './GameListEnterScoreButton';
import { getNormalizedGames } from '../../utils/arrayUtils';
import { gameActions } from '../../redux/games/actions';

interface Props {
    tournamentId: number;
    gameKey: string;
    maxScores?: number;
    tabIndex: number;
    normalizedPlayers?: { [id: number]: FetchedPlayer }
}

const GameListRow = ({ tournamentId, gameKey, tabIndex, normalizedPlayers, maxScores = 10 }: Props) => {
    const [scoresOpen, setScoresOpen] = useState<boolean>(false);
    const [stateChanged, setStateChanged] = useState<boolean>(false);
    const [numberOfAdditionalGames, setNumberOfAdditionalGames] = useState<number>(0);
    const fetchedTournamentsData = useSelector((state: RootState) => state.entities.fetchedTournaments.data);
    const scoresRef = useRef<any>();
    const enterScoreContentRef = useRef<any>(null);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const tournamentGames = fetchedGames[tournamentId];
    const normalizedGames = getNormalizedGames(tournamentGames);
    const dispatch = useDispatch();
    const classes = gameListRowStyles();

    if (!normalizedGames || !fetchedTournamentsData[tournamentId]) {
        return null;
    }

    const player1 = normalizedGames[gameKey]?.player1;
    const player2 = normalizedGames[gameKey]?.player2;
    const player1Name: string = normalizedPlayers && player1 ?
        (player1?.length === 1 ?
            normalizedPlayers[player1[0].id]?.name :
            (player1?.length === 2 ? `${normalizedPlayers[player1[0].id]?.name} / ${normalizedPlayers[player1[1].id]?.name}` : '')) :
        '';
    const player2Name: string = normalizedPlayers && player1 ?
        (player2?.length === 1 ?
            normalizedPlayers[player2[0].id]?.name :
            (player2?.length === 2 ? `${normalizedPlayers[player2[0].id]?.name} / ${normalizedPlayers[player2[1].id]?.name}` : '')) :
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
        const gameData: GameUpdateReqData = {
            id: normalizedGames[gameKey].id,
            scores1: Object.values(scores1),
            scores2: Object.values(scores2),
        }

        dispatch(gameActions.editGame(gameData));
        closeScores();
    }
    const tournamentNumberOfGoals = fetchedTournamentsData[tournamentId] && fetchedTournamentsData[tournamentId].numberOfGoals;

    const visibleScores = (typeof tournamentNumberOfGoals === 'number' &&
        tournamentNumberOfGoals < maxScores) ?
        tournamentNumberOfGoals + 1 :
        maxScores;

    if (!normalizedPlayers) {
        return null;
    }
    const scores1 = normalizedGames[gameKey]?.scores1, scores2 = normalizedGames[gameKey]?.scores2
    let score1, score2;
    if (scores1 && scores2) {
        score1 = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length).score1;
        score2 = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length).score2;
    }

    return (
        <div className={classes.gameRowContainer}>
            <div className={classes.gameRow}>
                <div className={classes.gameRowP1}>{player1Name}</div>
                <button className={classes.scoreContainer} onClick={toggleScoresOpen} type='button' tabIndex={tabIndex} id={`toggle-score-button-${gameKey}`}>
                    <GameListEnterScoreButton
                        scoresOpen={scoresOpen}
                        score1={score1}
                        score2={score2}
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
                        game={normalizedGames[gameKey]}
                        tournament={fetchedTournamentsData[tournamentId]}
                        visibleScores={visibleScores}
                        playerNames={{ left: player1Name, right: player2Name }}
                        getNumberOfAdditionalGames={handleAdditionalGameCount}
                    />
                </div>
            </div>
        </div>
    )
}

export default GameListRow
