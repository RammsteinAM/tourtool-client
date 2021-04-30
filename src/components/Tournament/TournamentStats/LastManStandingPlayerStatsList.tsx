import React, { useState } from 'react'
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
import { updateSettings } from '../../../redux/settings/actions';
import lastManStandingStyles from './lastManStandingStyles';
import { LMSColOrderKeys } from '../../../types/entities';
import { getNormalizedParticipants } from '../../../utils/arrayUtils';
import { useParams } from 'react-router-dom';
import TournamentStatsSettingsList from './TournamentStatsSettingsList';

interface Props {
    playerData: Players;
    bttvMode?: boolean;
}

const LastManStandingPlayerStatsList = (props: Props) => {
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const statsColOrder = useSelector((state: RootState) => state.settings.tournamentSidebarColumnOrder) || ['name', 'numberOfGames', 'lives'];
    const statsEnabledColumns = useSelector((state: RootState) => state.settings.tournamentSidebarEnabledColumns) || ['name', 'numberOfGames', 'lives'];
    const dispatch = useDispatch();
    const classes = lastManStandingStyles();
    const { t } = useTranslation();
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10);
    const fetchedTournamentData = entityState.fetchedTournaments.data[tournamentId]
    const normalizedPlayers = getNormalizedParticipants(entityState.fetchedPlayers.data);

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

    const handleSettingsButtonClick = (e: React.MouseEvent) => {
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
            let name = '';
            if (typeof player.id === 'number') {
                name = normalizedPlayers[player.id].name;
            }
            if (typeof player.id === 'object') {
                name = `${normalizedPlayers[player.id[0]].name} / ${normalizedPlayers[player.id[1]].name}`
            }
            return (
                <LastManStandingPlayerStatsRow
                    key={i}
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
                    bttvMode={props.bttvMode}
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
                            <tr>
                                <th className={clsx(classes.lmsStatsTd, classes.lmsStatsTdPlacement)}>#</th>
                                {visibleOrderedColumns.map((key: LMSColOrderKeys) => {
                                    return <th key={key} className={clsx(classes.lmsStatsHeaderTd, { [classes.lmsStatsTdPlayer]: key === 'name' })}>
                                        {statNames[key]}
                                    </th>
                                })}
                            </tr>
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
