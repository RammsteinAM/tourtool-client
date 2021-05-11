import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DBGameData, FetchedTournamentForView } from '../../types/entities';
import { getMultipleSetScores } from '../../utils/scoreUtils';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { CircularProgress } from '@material-ui/core';
import gameListRowForWatchStyles from './gameListRowForWatchStyles';
import { useTranslation } from "react-i18next";
interface Props {
    tournamentData: FetchedTournamentForView;
    gameKey: string;
    normalizedPlayers?: { [id: number]: string }
}

const GameListRowForWatch = ({ tournamentData, gameKey, normalizedPlayers }: Props) => {
    const normalizedGames = tournamentData.games.reduce((acc: { [index: string]: DBGameData }, val: DBGameData) => {
        if (!val.index) {
            return acc;
        }
        acc[val.index] = val;
        return acc;
    }, {})

    const classes = gameListRowForWatchStyles();

    const { t } = useTranslation();

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
                        <div className={classes.emptyScoreConteiner}>
                            <ScheduleIcon style={{ fontSize: 24 }} />
                        </div> :
                        <div className={classes.scoreDisplay}>
                            <span className={score1 > score2 || score1 === score2 ? classes.winningScoreLeft : ''}>{score1}</span>
                            <span> : </span>
                            <span className={score1 < score2 || score1 === score2 ? classes.winningScoreRight : ''}>{score2}</span>
                        </div>
                    }
                </div>
                <div className={classes.gameRowP2}>{player2Name}</div>
            </div>
            {scores1 && scores2 && scores1.length > 1 && scores2.length > 1 && scores1.length === scores2.length &&
                <div className={classes.addtitionalScoresDisplay} title={t('Sets')}>{
                    [...Array(scores1.length).keys()].map((i) => {
                        return <div className={classes.addtitionalScoreItem}>
                            <span>{scores1[i]}</span>
                            <span> : </span>
                            <span>{scores2[i]}</span>
                        </div>
                    })
                }
                </div>
            }
        </div>
    )
}

export default GameListRowForWatch
