import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import LastManStandingPlayerStatsRow from './LastManStandingPlayerStatsRow';
import { Players } from '../../../pages/Tournaments/LastManStanding';
import toast from '../../IndependentSnackbar';
import TournamentStatsSettingsList from './TournamentStatsSettingsList';
import { updateSettings } from '../../../redux/settings/actions';
import lastManStandingStyles from './lastManStandingStyles';
import { FetchedPlayer, LMSColOrderKeys } from '../../../types/entities';
import { getNormalizedParticipants } from '../../../utils/arrayUtils';
import { useParams } from 'react-router-dom';
import { entityActions } from '../../../redux/tournamentEntities/actions';
import { gameActions } from '../../../redux/games/actions';
import { getMultipleSetScores } from '../../../utils/scoreUtils';

interface Props {
    playerData: Players
}

const LastManStandingPlayerStatsList = (props: Props) => {
    // const [playerData, setPlayerData] = useState<Players>({});
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [easterEgg, setEasterEgg] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    // const games = useSelector((state: RootState) => state.entities.games);
    // const lmsPlayers = useSelector((state: RootState) => state.entities.lmsPlayers);
    // const settingsState = useSelector((state: RootState) => state.settings);
    const statsColOrder = useSelector((state: RootState) => state.settings.tournamentSidebarColumnOrder) || ['name', 'numberOfGames', 'lives'];
    const statsEnabledColumns = useSelector((state: RootState) => state.settings.tournamentSidebarEnabledColumns) || ['name', 'numberOfGames', 'lives'];
    const dispatch = useDispatch();
    const classes = lastManStandingStyles();
    const { t } = useTranslation();
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10);
    const fetchedTournamentData = entityState.fetchedTournaments.data[tournamentId]
    const tournamentGames = fetchedGames[tournamentId];
    const tournamentPlayerIds = fetchedTournamentData.players;
    // const tournament = fetchedTournaments.data[tournamentId];
    // const currentTournament = fetchedTournaments.data[tournamentId];
    const fetchedPlayers = entityState.fetchedPlayers.data;
    const normalizedPlayers = getNormalizedParticipants(entityState.fetchedPlayers.data);

    // useEffect(() => {

    //     // dispatch(gameActions.getTournamentGames(tournamentId));
    // }, [])

    // useEffect(() => {
    //     const playerData = getPlayersDataWithStats();
    //     setPlayerData(playerData);
    // }, [tournamentGames])

    const statNames: { [key in LMSColOrderKeys]: string } = {
        name: t('LMSStatsCol_Player'),
        lives: t('LMSStatsCol_Lives'),
        numberOfGames: t('LMSStatsCol_NumberOfGames'),
        points: t('LMSStatsCol_Points'),
        averagePoints: t('LMSStatsCol_AveragePoints'),
        goals: t('LMSStatsCol_Goals'),
        goalsIn: t('LMSStatsCol_GoalsIn'),
        goalDiff: t('LMSStatsCol_GoalDiff'),
        matchesWon: t('LMSStatsCol_MatchesWon'),
        matchesLost: t('LMSStatsCol_MatchesLost'),
        matchesDraw: t('LMSStatsCol_MatchesDraw'),
    }

    // const getPlayersDataWithStats = (): Players => {
    //     const numberOfLives = fetchedTournamentData?.numberOfLives;
    //     const pointsForWin = fetchedTournamentData?.pointsForWin;
    //     const pointsForDraw = fetchedTournamentData?.pointsForDraw;
    //     const tournamentPlayers = fetchedPlayers.filter(p => tournamentPlayerIds && tournamentPlayerIds?.indexOf(p.id) >= 0)
    //     if (typeof numberOfLives !== 'number' || typeof pointsForWin !== 'number' || typeof pointsForDraw !== 'number') return {};
    //     const players: Players = tournamentPlayers.reduce((acc: Players, val) => {
    //         if (typeof val.id === 'number') {
    //             acc[val.id] = {
    //                 id: val.id,
    //                 lives: numberOfLives,
    //                 numberOfGames: 0,
    //                 points: 0,
    //                 goals: 0,
    //                 goalsIn: 0,
    //                 matchesWon: 0,
    //                 matchesLost: 0,
    //             }
    //         }
    //         else if (val.id[0] && val.id[1]) {
    //             acc[val.id[0]] = {
    //                 id: val.id[0],
    //                 lives: numberOfLives,
    //                 numberOfGames: 0,
    //                 points: 0,
    //                 goals: 0,
    //                 goalsIn: 0,
    //                 matchesWon: 0,
    //                 matchesLost: 0,
    //             }
    //             acc[val.id[1]] = {
    //                 id: val.id[1],
    //                 lives: numberOfLives,
    //                 numberOfGames: 0,
    //                 points: 0,
    //                 goals: 0,
    //                 goalsIn: 0,
    //                 matchesWon: 0,
    //                 matchesLost: 0,
    //             }
    //         }
    //         return acc;
    //     }, {});

    //     const playersData = tournamentGames?.reduce((acc, val, i) => {
    //         if (!val.scores1 || !val.scores2 || val.scores1.length === 0 || val.scores2.length === 0) {
    //             return acc;
    //         }
    //         const { score1, score2 } = getMultipleSetScores(val.scores1, val.scores2, val.scores1.length);
    //         const scores1Sum = val.scores1.reduce((acc, val) => acc + val);
    //         const scores2Sum = val.scores2.reduce((acc, val) => acc + val);

    //         if (!val.player1 || !val.player2) {
    //             return acc;
    //         }

    //         const id1_0 = val.player1[0] && val.player1[0].id;
    //         const id1_1 = val.player1[1] && val.player1[1].id;
    //         const id2_0 = val.player2[0] && val.player2[0].id;
    //         const id2_1 = val.player2[1] && val.player2[1].id;

    //         // SINGLE, TEAM
    //         if (id1_0 && id2_0 && acc[id1_0] && acc[id2_0] && !id1_1 && !id2_1) {

    //             acc[id1_0].numberOfGames++;
    //             acc[id2_0].numberOfGames++;

    //             acc[id1_0].goals += scores1Sum;
    //             acc[id2_0].goals += scores2Sum;

    //             acc[id1_0].goalsIn += scores2Sum;
    //             acc[id2_0].goalsIn += scores1Sum;

    //             if (score1 > score2) {
    //                 acc[id1_0].points += pointsForWin;
    //                 acc[id1_0].matchesWon += 1;
    //                 acc[id2_0].matchesLost += 1;
    //                 acc[id2_0].lives--;
    //             }
    //             if (score1 < score2) {
    //                 acc[id1_0].points += pointsForWin;
    //                 acc[id1_0].matchesLost += 1;
    //                 acc[id2_0].matchesWon += 1;
    //                 acc[id1_0].lives--;
    //             }
    //             if (score1 === score2) {
    //                 acc[id1_0].points += pointsForDraw;
    //                 acc[id2_0].points += pointsForDraw;
    //             }
    //         }

    //         // DYP
    //         else if (id1_0 && id2_0 && id1_1 && id2_1) {

    //             acc[id1_0].numberOfGames++;
    //             acc[id1_1].numberOfGames++;
    //             acc[id2_0].numberOfGames++;
    //             acc[id2_1].numberOfGames++;

    //             acc[id1_0].goals += scores1Sum;
    //             acc[id1_1].goals += scores1Sum;
    //             acc[id2_0].goals += scores2Sum;
    //             acc[id2_1].goals += scores2Sum;

    //             acc[id1_0].goalsIn += scores2Sum;
    //             acc[id1_1].goalsIn += scores2Sum;
    //             acc[id2_0].goalsIn += scores1Sum;
    //             acc[id2_1].goalsIn += scores1Sum;

    //             if (score1 > score2) {
    //                 acc[id1_0].points += pointsForWin;
    //                 acc[id1_1].points += pointsForWin;
    //                 acc[id1_0].matchesWon += 1;
    //                 acc[id1_1].matchesWon += 1;
    //                 acc[id2_0].matchesLost += 1;
    //                 acc[id2_1].matchesLost += 1;
    //                 acc[id2_0].lives--;
    //                 acc[id2_1].lives--;
    //             }
    //             if (score1 < score2) {
    //                 acc[id2_0].points += pointsForWin;
    //                 acc[id2_1].points += pointsForWin;
    //                 acc[id2_0].matchesWon += 1;
    //                 acc[id2_1].matchesWon += 1;
    //                 acc[id1_0].matchesLost += 1;
    //                 acc[id1_1].matchesLost += 1;
    //                 acc[id1_0].lives--;
    //                 acc[id1_1].lives--;
    //             }
    //             if (score1 === score2) {
    //                 acc[id1_0].points += pointsForDraw;
    //                 acc[id1_1].points += pointsForDraw;
    //                 acc[id2_0].points += pointsForDraw;
    //                 acc[id2_1].points += pointsForDraw;
    //             }
    //         }

    //         return acc;
    //     }, players);

    //     return playersData;
    // };


    const handleSettingsButtonClick = (e: React.MouseEvent) => {
        if (e.ctrlKey && e.shiftKey && e.altKey) {
            !easterEgg && toast.success('KEKW mode activated.');
            setEasterEgg(!easterEgg);
            return;
        }
        setSettingsOpen(!settingsOpen);
    }

    const visibleOrderedColumns: LMSColOrderKeys[] = statsEnabledColumns.sort((a, b) => {
        if (statsColOrder.indexOf(a) > statsColOrder.indexOf(b)) {
            return 1;
        }
        return -1;
    });

    const renderPlayersWithStats = () => {

        const playersArr = props.playerData && Object.values(props.playerData).sort((a, b) => {
            if (a.lives < b.lives) {
                return 1
            }
            return -1;
        })

        return playersArr?.map((player, i) => {
            // const name = typeof player.id === 'number' ? player.id : `${player.id[0]} / ${player.id[1]}`;
            let name = '';
            if (typeof player.id === 'number') {
                name = normalizedPlayers[player.id].name;
            }
            if (typeof player.id === 'object') {
                name = `${normalizedPlayers[player.id[0]].name} / ${normalizedPlayers[player.id[1]].name}`
            }
            return (
                <LastManStandingPlayerStatsRow
                    placement={i + 1}
                    name={name}
                    lives={player.lives}
                    goals={player.goals}
                    goalsIn={player.goalsIn}
                    goalDiff={player.goals - player.goalsIn}
                    numberOfGames={player.numberOfGames}
                    points={player.points}
                    averagePoints={player.numberOfGames > 0 ? player.points / player.numberOfGames : 0}
                    matchesWon={player.matchesWon}
                    matchesLost={player.matchesLost}
                    matchesDraw={player.numberOfGames - player.matchesWon - player.matchesLost}
                    colOrderedKeys={visibleOrderedColumns}
                    easterEgg={easterEgg}
                />
            )
        });
    }

    const handleColumnChange = (columns: LMSColOrderKeys[]) => {
        dispatch(updateSettings({ tournamentSidebarColumnOrder: [...columns] }))
    }

    return (
        <>
            <div className={classes.tournamentSidebarHeaderContainer}>
                <div
                    className={clsx(classes.tournamentSidebarHeader, { [classes.tournamentSidebarHeaderClosed]: !settingsOpen })}
                    style={{ maxHeight: settingsOpen ? '416px' : '56px' }}
                >
                    <div className={classes.tournamentSidebarHeaderTitle}>
                        {settingsOpen && <div className={classes.tournamentSidebarHeaderTitleText}>{t('Configure Table')}</div>}
                        <IconButton
                            onClick={handleSettingsButtonClick}
                        >
                            {settingsOpen ?
                                <CloseIcon className={classes.icons} /> :
                                <SettingsIcon className={classes.icons} />
                            }
                        </IconButton>
                    </div>
                    <div style={!settingsOpen ? { visibility: 'hidden' } : {}}>
                        <TournamentStatsSettingsList orderedColumns={statsColOrder} enabledColumns={statsEnabledColumns} onChange={handleColumnChange} />
                    </div>
                </div>
            </div>
            <CardContent className={classes.cardContent}>
                <div className={classes.statnsTableContainer}>

                    <table className={classes.lmsStatsTable}>
                        <thead className={classes.lmsStatsThead}>
                            <td className={clsx(classes.lmsStatsTd, classes.lmsStatsTdPlacement)}>#</td>
                            {visibleOrderedColumns.map((key: LMSColOrderKeys) => {
                                return <td className={clsx(classes.lmsStatsHeaderTd, { [classes.lmsStatsTdPlayer]: key === 'name' })}>
                                    {statNames[key]}
                                </td>
                            })}
                        </thead>
                        <tbody>
                            {renderPlayersWithStats()}
                        </tbody>
                    </table>
                </div>

            </CardContent>
        </>
    )
}

export default LastManStandingPlayerStatsList
