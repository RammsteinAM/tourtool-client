import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import lastManStandingStyles from './lastManStandingStyles';
import LastManStandingPlayerStatsRow, { LMSColOrderKeys } from './LastManStandingPlayerStatsRow';
import { Typography } from '@material-ui/core';
import { Players } from './LastManStanding';
import toast from '../../components/IndependentSnackbar';
import TournamentStatsSettingsList from '../../components/Tournament/TournamentStatsSettingsList';
import { updateSettings } from '../../redux/settings/actions';

interface Props {
    playersData: Players
}

const LastManStandingPlayerStatsList = (props: Props) => {
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [easterEgg, setEasterEgg] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const games = useSelector((state: RootState) => state.entities.games);
    const lmsPlayers = useSelector((state: RootState) => state.entities.lmsPlayers);
    const settingsState = useSelector((state: RootState) => state.settings);
    const statsColOrder = useSelector((state: RootState) => state.settings.tournamentSidebarColumnOrder) || ['name', 'numberOfGames', 'lives'];
    const statsEnabledColumns = useSelector((state: RootState) => state.settings.tournamentSidebarEnabledColumns) || ['name', 'numberOfGames', 'lives'];
    const dispatch = useDispatch();
    const classes = lastManStandingStyles();
    const { t } = useTranslation();


    const statNames: { [key in LMSColOrderKeys]: string } = {
        name: t('LMSStatsCol_Player'),
        lives: t('LMSStatsCol_Lives'),
        numberOfGames: t('LMSStatsCol_NumberOfGames'),
        points: t('LMSStatsCol_Points'),
        goals: t('LMSStatsCol_Goals'),
        goalsIn: t('LMSStatsCol_GoalsIn'),
        goalDiff: t('LMSStatsCol_GoalDiff'),
    }

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

        const playersArr = Object.values(props.playersData).sort((a, b) => {
            if (a.lives < b.lives) {
                return 1
            }
            return -1;
        })

        return playersArr.map((player, i) => {
            const name = typeof player.name === 'string' ? player.name : `${player.name[0]} / ${player.name[1]}`;
            return (
                <LastManStandingPlayerStatsRow
                    placement={i + 1}
                    name={player.name}
                    lives={player.lives}
                    goals={player.goals}
                    goalsIn={player.goalsIn}
                    goalDiff={player.goals - player.goalsIn}
                    numberOfGames={player.numberOfGames}
                    points={player.points}
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

            </CardContent>
        </>
    )
}

export default LastManStandingPlayerStatsList
