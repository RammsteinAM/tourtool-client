import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DBGameData, FetchedTournamentForView } from '../../types/entities';
import { getMultipleSetScores } from '../../utils/scoreUtils';
import GameListEnterScoreButton from './GameListEnterScoreButton';
import { getNormalizedGames } from '../../utils/arrayUtils';
import { CircularProgress } from '@material-ui/core';
import gameListRowStyles from './gameListRowStyles';
import { useTranslation } from "react-i18next";
interface Props {
    tournamentData: FetchedTournamentForView;
    gameKey: string;
    normalizedPlayers?: { [id: number]: string }
}

const GameListRowForWatch = ({ tournamentData, gameKey, normalizedPlayers }: Props) => {
    // const [scoresOpen, setScoresOpen] = useState<boolean>(false);
    // const [stateChanged, setStateChanged] = useState<boolean>(false);
    // const [numberOfAdditionalGames, setNumberOfAdditionalGames] = useState<number>(0);
    // const fetchedTournamentsData = useSelector((state: RootState) => state.entities.fetchedTournaments.data);
    // const scoresRef = useRef<any>();
    // const enterScoreContentRef = useRef<any>(null);
    // const fetchedGames = useSelector((state: RootState) => state.games.data);
    // const tournamentGames = fetchedGames[tournamentId];
    // const normalizedGames = getNormalizedGames(tournamentGames);
    const normalizedGames = tournamentData.games.reduce((acc: { [index: string]: DBGameData }, val: DBGameData) => {
        if (!val.index) {
            return acc;
        }
        acc[val.index] = val;
        // val.scores1 && acc[val.index].scores1 = val.scores1;
        return acc;
    }, {})
    // const dispatch = useDispatch();
    const classes = gameListRowStyles();

    const { t } = useTranslation();
    // if (!normalizedGames || !fetchedTournamentsData[tournamentId]) {
    //     return null;
    // }

    const player1 = normalizedGames[gameKey]?.player1;
    const player2 = normalizedGames[gameKey]?.player2;
    const player1Name: string | null = normalizedPlayers && player1 ?
        (player1?.length === 1 ?
            normalizedPlayers[player1[0].id] :
            ((player1?.length === 2 && normalizedPlayers[player1[0].id] && normalizedPlayers[player1[1].id]) ?
                `${normalizedPlayers[player1[0].id]} / ${normalizedPlayers[player1[1].id]}` : null)) :
        null;
    const player2Name: string | null = normalizedPlayers && player1 ?
        (player2?.length === 1 ?
            normalizedPlayers[player2[0].id] :
            ((player2?.length === 2 && normalizedPlayers[player2[0].id] && normalizedPlayers[player2[1].id]) ?
                `${normalizedPlayers[player2[0].id]} / ${normalizedPlayers[player2[1].id]}` : null)) :
        null;

    const scores1 = normalizedGames[gameKey]?.scores1, scores2 = normalizedGames[gameKey]?.scores2
    let score1, score2;
    if (scores1 && scores2) {
        score1 = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length).score1;
        score2 = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length).score2;
    }

    if (!player1Name || !player2Name) {
        return (
            <div className={classes.gameRowContainer}>
                <div className={classes.gameRow}>
                    <div></div>
                    <div className={classes.loadingContainer}>
                        <CircularProgress />
                    </div>
                    <div></div>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.gameRowContainer}>
            <div className={classes.gameRow}>
                <div className={classes.gameRowP1}>{player1Name}</div>
                <div className={classes.scoreContainer} id={`toggle-score-button-${gameKey}`}>
                    {typeof score1 !== 'number' || typeof score2 !== 'number' ?
                        <div className={classes.enterResultButton}>
                            {t('KEKWait')}
                        </div> :
                        <div className={classes.enterScoreButtonScoreDisplay}>
                            <span className={score1 > score2 || score1 === score2 ? classes.winningScoreLeft : ''}>{score1}</span>
                            <span> : </span>
                            <span className={score1 < score2 || score1 === score2 ? classes.winningScoreRight : ''}>{score2}</span>
                        </div>
                    }
                </div>
                <div className={classes.gameRowP2}>{player2Name}</div>
            </div>
        </div>
    )
}

export default GameListRowForWatch
