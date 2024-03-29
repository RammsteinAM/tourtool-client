import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { gameActions } from '../../redux/games/actions';
import { RootState } from '../../redux/store';
import { entityActions } from '../../redux/tournamentEntities/actions';
import { Player } from '../../types/entities';
import { Nullable } from '../../types/main';
import { getNormalizedParticipants } from '../../utils/arrayUtils';
import { getMultipleSetScores } from '../../utils/scoreUtils';
import { splitGameKey } from '../../utils/stringUtils';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from "react-i18next";
import { ReactComponent as EliminationIcon } from '../../resources/icons/elimination.svg';
import { ReactComponent as LastManStandingIcon } from '../../resources/icons/lms.svg';
import { ReactComponent as WinnerBadge } from '../../resources/images/winner.svg';
import { thirdPlaceIndex } from '../../utils/constants';
import { calculatePlayersDataWithStats } from '../../helpers/tournamentHelpers';
import clsx from 'clsx';
import eliminationResultStyles from './tournamentResultStyles';

const TournamentResult = () => {
    const [placements, setPlacements] = useState<{ [place: number]: Player[] }>()
    const [winsAndLosses, setWinsAndLosses] = useState<{ [playerId: number]: { wins: number, losses: number } }>()
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const dispatch = useDispatch();
    const tournamentId = parseInt(tournamentIdString, 10)
    const fetchedTournamentsData = useSelector((state: RootState) => state.entities.fetchedTournaments.data);
    const fetchedPlayersData = useSelector((state: RootState) => state.entities.fetchedPlayers.data);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const tournamentGames = fetchedGames[tournamentId];
    const classes = eliminationResultStyles();
    const { t } = useTranslation();

    useEffect(() => {
        if (!fetchedTournamentsData[tournamentId]) {
            dispatch(entityActions.getTournament(tournamentId));
        }
        if (!tournamentGames) {
            dispatch(gameActions.getTournamentGames(tournamentId))
        }
        if (fetchedPlayersData.length === 0) {
            dispatch(entityActions.getPlayers())
        }
    }, [])

    useEffect(() => {
        if (!fetchedTournamentsData[tournamentId] || !tournamentGames || fetchedPlayersData?.length === 0) {
            return;
        }
        const tournamentType = fetchedTournamentsData[tournamentId].tournamentTypeId;
        switch (tournamentType) {
            case 1:
                setDataForElimination();
                break;
            case 2:
                setDataForLMS();
                break;

            default:
                break;
        }
    }, [fetchedTournamentsData, tournamentGames, fetchedGames, fetchedPlayersData, fetchedPlayersData.length]);

    if (fetchedPlayersData.length === 0 || !fetchedTournamentsData) {
        return null;
    }

    const normalizedPlayers = getNormalizedParticipants(fetchedPlayersData);

    const setDataForElimination = () => {
        const finalRoundKey = tournamentGames
            .reduce((acc: number[], val) => {
                const round = splitGameKey(val.index).round;
                if (round > 0 && acc.indexOf(round) === -1) {
                    acc.push(round)
                }
                return acc;
            }, [])
            .sort(function (a, b) { return b - a })[0]

        const placementsWithPlayers = tournamentGames.reduce((acc: { [place: number]: Player[] }, val) => {
            let winner: Nullable<Player> = null, loser: Nullable<Player> = null;
            if (val.player1 && val.player2 && val.scores1 && val.scores2 && val.scores1.length > 0 && val.scores2.length > 0) {
                const { score1, score2 } = getMultipleSetScores(val.scores1, val.scores2, Object.values(val.scores1).length);
                if (score1 > score2) {
                    winner = val.player1;
                    loser = val.player2;
                }
                if (score1 < score2) {
                    winner = val.player2;
                    loser = val.player1;
                }
            }
            if (val.hasByePlayer || !winner || !loser) {
                return acc;
            }
            if (val.index === thirdPlaceIndex) {
                acc[3] = [winner];
                acc[4] = [loser];
                return acc;
            }
            const distanceFromFinal = finalRoundKey - splitGameKey(val.index).round;
            if (distanceFromFinal === 0) {
                acc[1] = [winner];
                acc[2] = [loser];
                return acc;
            }
            if (distanceFromFinal === 1 && acc[4]) {
                return acc;
            }
            const placement = 2 ** (distanceFromFinal) + 1;
            if (acc[placement]) {
                acc[placement].push(loser)
            }
            else {
                acc[placement] = [loser];
            }
            return acc;
        }, {});

        const normalizedWinsAndLosses = tournamentGames.reduce((acc: { [playerId: number]: { wins: number, losses: number } }, val) => {
            let winner: Nullable<Player> = null, loser: Nullable<Player> = null;
            if (val.player1 && val.player2 && val.scores1 && val.scores2 && val.scores1.length > 0 && val.scores2.length > 0) {
                const { score1, score2 } = getMultipleSetScores(val.scores1, val.scores2, Object.values(val.scores1).length);
                if (score1 > score2) {
                    winner = val.player1;
                    loser = val.player2;
                }
                if (score1 < score2) {
                    winner = val.player2;
                    loser = val.player1;
                }
            }
            if (val.hasByePlayer || !winner || !loser) {
                return acc;
            }
            acc[winner[0]?.id] = { wins: acc[winner[0]?.id]?.wins ? acc[winner[0]?.id].wins + 1 : 1, losses: acc[winner[0]?.id]?.losses || 0 }
            acc[loser[0]?.id] = { wins: acc[loser[0]?.id]?.wins || 0, losses: acc[winner[0]?.id]?.losses ? acc[winner[0]?.id].losses + 1 : 1 }
            if (winner[1]?.id) {
                acc[winner[1]?.id] = { wins: acc[winner[1]?.id]?.wins ? acc[winner[1]?.id].wins + 1 : 1, losses: acc[winner[1]?.id]?.losses || 0 }
            }
            if (loser[1]?.id) {
                acc[loser[1]?.id] = { wins: acc[loser[1]?.id]?.wins || 0, losses: acc[winner[1]?.id]?.losses ? acc[winner[1]?.id].losses + 1 : 1 }
            }
            return acc;
        }, {});

        setPlacements(placementsWithPlayers);
        setWinsAndLosses(normalizedWinsAndLosses);
    }

    const setDataForLMS = () => {
        const isDYP = !fetchedTournamentsData[tournamentId].monsterDYP && tournamentGames?.find(game => game.index === '1-1')?.player1?.length === 2;
        const playerData = calculatePlayersDataWithStats(fetchedTournamentsData[tournamentId], tournamentGames, fetchedPlayersData, normalizedPlayers, isDYP);

        const playersArr = playerData && Object.values(playerData).sort((a, b) => {
            if (a.lives < b.lives) return 1
            if (a.lives > b.lives) return -1;
            if (a.numberOfGames < b.numberOfGames) return 1
            if (a.numberOfGames > b.numberOfGames) return -1;
            if (a.matchesWon < b.matchesWon) return 1
            if (a.matchesWon > b.matchesWon) return -1;
            return 0;
        })

        const placementsWithPlayers = playersArr.reduce((acc: { [place: number]: Player[] }, val, i) => {
            const place = i + 1;
            if (typeof val.id === 'number') {
                acc[place] = [[{ id: val.id }]]
            }
            if (typeof val.id === 'object') {
                acc[place] = [[{ id: val.id[0] }]]
                if (val.id[1]) {
                    acc[place][0].push({ id: val.id[1] })
                }
            }
            return acc;
        }, {});

        const normalizedWinsAndLosses = tournamentGames.reduce((acc: { [playerId: number]: { wins: number, losses: number } }, val) => {
            let winner: Nullable<Player> = null, loser: Nullable<Player> = null;
            if (val.player1 && val.player2 && val.scores1 && val.scores2 && val.scores1.length > 0 && val.scores2.length > 0) {
                const { score1, score2 } = getMultipleSetScores(val.scores1, val.scores2, Object.values(val.scores1).length);
                if (score1 > score2) {
                    winner = val.player1;
                    loser = val.player2;
                }
                if (score1 < score2) {
                    winner = val.player2;
                    loser = val.player1;
                }
            }
            if (val.hasByePlayer || !winner || !loser) {
                return acc;
            }
            acc[winner[0]?.id] = { wins: acc[winner[0]?.id]?.wins ? acc[winner[0]?.id].wins + 1 : 1, losses: acc[winner[0]?.id]?.losses || 0 }
            acc[loser[0]?.id] = { wins: acc[loser[0]?.id]?.wins || 0, losses: acc[winner[0]?.id]?.losses ? acc[winner[0]?.id].losses + 1 : 1 }
            if (winner[1]?.id) {
                acc[winner[1]?.id] = { wins: acc[winner[1]?.id]?.wins ? acc[winner[1]?.id].wins + 1 : 1, losses: acc[winner[1]?.id]?.losses || 0 }
            }
            if (loser[1]?.id) {
                acc[loser[1]?.id] = { wins: acc[loser[1]?.id]?.wins || 0, losses: acc[winner[1]?.id]?.losses ? acc[winner[1]?.id].losses + 1 : 1 }
            }
            return acc;
        }, {});

        setPlacements(placementsWithPlayers);
        setWinsAndLosses(normalizedWinsAndLosses);
    }

    const renderHeaderByType = () => {
        const tournamentType = fetchedTournamentsData[tournamentId]?.tournamentTypeId;
        switch (tournamentType) {
            case 1:
                return (
                    <>
                        <EliminationIcon fill='#8ebd5e' width='90px' height='90px' />
                        <div className={classes.tournamentType}>{t('Elimination')}</div>
                    </>
                )
            case 2:
                return (
                    <>
                        <LastManStandingIcon fill='#8ebd5e' width='90px' height='90px' />
                        <div className={classes.tournamentType}>{t('Last Man Standing')}</div>
                    </>
                )
            default:
                break;
        }
    }

    return (
        <Paper elevation={3} className={classes.paper} id='print-section'>
            <div className={classes.header}>
                {renderHeaderByType()}
                <div className={classes.tournamentTitle}>{fetchedTournamentsData[tournamentId]?.name}</div>
            </div>

            <div className={classes.container}>
                {placements && winsAndLosses && Object.keys(placements).map((place: string) => {
                    const placementPlayers = placements[Number(place)];
                    return (
                        <>
                            {Number(place) === 1 && <WinnerBadge className={classes.winnerBadge} />}
                            <div className={clsx(classes.row, {
                                // [classes.rowWithBorder]: Number(place) > 1
                            })}>
                                <span className={classes.placement}>{place}.</span>
                                <div className={classes.playerContainer}>{
                                    placementPlayers.map(player => {
                                        let playerName = normalizedPlayers[player[0]?.id].name;
                                        if (player[1]?.id) {
                                            playerName += ` / ${normalizedPlayers[player[1].id].name}`
                                        }
                                        return <div className={clsx(classes.player, {
                                            [classes.rowWithBorder]: Number(place) > 1
                                        })}>
                                            <div className={classes.playerName}>{playerName}</div>
                                            <span className={classes.playerMatches}>{t('matches-won-num', { n: winsAndLosses[player[0].id].wins })},</span>
                                            <span className={classes.playerMatches}>{t('matches-lost-num', { n: winsAndLosses[player[0].id].losses })}</span>
                                        </div>
                                    })
                                }</div>
                            </div>
                        </>
                    )
                })}
            </div>
        </Paper>

    )
}

export default TournamentResult
