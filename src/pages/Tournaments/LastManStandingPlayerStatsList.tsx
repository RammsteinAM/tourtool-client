import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { splitGameKey } from '../../utils/stringUtils';
import EliminationCard from './EliminationCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { debounce, differenceBy, shuffle } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

import clsx from 'clsx';
import lastManStandingStyles from './lastManStandingStyles';
import LastManStandingPlayerStatsRow, { LMSColOrderKeys } from './LastManStandingPlayerStatsRow';

interface Player {
    [key: string]: {
        name: string;
        lives: number;
        numberOfGames: number;
        points: number;
        goals: number;
        goalsIn: number;
        // goalDiff: number;
    };
}
interface Props {
}

const LastManStandingPlayerStatsList = (props: Props) => {
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    // const [settingsOpen, setSettingsOpen] = useState<LMSColOrderKeys[]>([]);
    const entityState = useSelector((state: RootState) => state.entities);
    const games = useSelector((state: RootState) => state.entities.games);
    const lmsPlayers = useSelector((state: RootState) => state.entities.lmsPlayers);
    const settingsState = useSelector((state: RootState) => state.settings);
    // const statsColOrder = useSelector((state: RootState) => state.settings.tournamentSidebarColumnOrder) || ['name', 'numberOfGames', 'lives'];
    const statsColOrder: LMSColOrderKeys[] = ['name', 'numberOfGames', 'goals', 'goalsIn', 'goalDiff', 'lives'];
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

    const handleSettingsButtonClick = () => {
        setSettingsOpen(!settingsOpen);
    }
    
    const renderPlayersWithStats = () => {
        const gamesArr = Object.values(games);

        const { numberOfLives, pointsForWin, pointsForDraw } = entityState.tournament;

        const players: Player = {};

        if (!numberOfLives) return;

        lmsPlayers.forEach(player => {
            if (typeof player.name === 'string') {
                players[player.name] = {
                    name: player.name,
                    lives: numberOfLives,
                    numberOfGames: 0,
                    points: 0,
                    goals: 0,
                    goalsIn: 0,
                }
            }
            // DYP
            else if (player.name[0] && player.name[1]) {
                players[player.name[0]] = {
                    name: player.name[0],
                    lives: numberOfLives,
                    numberOfGames: 0,
                    points: 0,
                    goals: 0,
                    goalsIn: 0,
                }
                players[player.name[1]] = {
                    name: player.name[1],
                    lives: numberOfLives,
                    numberOfGames: 0,
                    points: 0,
                    goals: 0,
                    goalsIn: 0,
                }
            }
        })
        const playersData = gamesArr.reduce(function (acc, val, i) {
            if (!val.score1 || !val.score2) {
                return acc;
            }

            // SINGLE OR TEAM
            if (typeof val.player1 === 'string' && typeof val.player2 === 'string') {

                acc[val.player1].numberOfGames++;
                acc[val.player2].numberOfGames++;

                acc[val.player1].goals += val.score1;
                acc[val.player2].goals += val.score2;

                acc[val.player1].goalsIn += val.score2;
                acc[val.player2].goalsIn += val.score1;

                if (val.score1 > val.score2) {
                    acc[val.player2].lives--;
                }
                if (val.score1 < val.score2) {
                    acc[val.player1].lives--;
                }

            }

            // DYP
            else if (val.player1[0] && val.player1[1] && val.player2[0] && val.player2[1]) {

                acc[val.player1[0]].numberOfGames++;
                acc[val.player1[1]].numberOfGames++;
                acc[val.player2[0]].numberOfGames++;
                acc[val.player2[1]].numberOfGames++;

                acc[val.player1[0]].goals += val.score1;
                acc[val.player1[1]].goals += val.score1;
                acc[val.player2[0]].goals += val.score2;
                acc[val.player2[1]].goals += val.score2;

                acc[val.player1[0]].goalsIn += val.score2;
                acc[val.player1[1]].goalsIn += val.score2;
                acc[val.player2[0]].goalsIn += val.score1;
                acc[val.player2[1]].goalsIn += val.score1;

                if (val.score1 > val.score2) {
                    acc[val.player2[0]].lives--;
                    acc[val.player2[1]].lives--;
                }
                if (val.score1 < val.score2) {
                    acc[val.player1[0]].lives--;
                    acc[val.player1[1]].lives--;
                }
            }

            return acc;
        }, players)

        const playersArr = Object.values(playersData).sort((a, b) => {
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
                    colOrderedKeys={/* statsColOrder */['name', 'numberOfGames', 'goals', 'goalsIn', 'goalDiff', 'lives']}
                />
            )
        });
    }


    return (
        <>
            <div className={classes.tournamentSidebarHeader}>
                <IconButton
                    onClick={handleSettingsButtonClick}
                    aria-label="show more"
                >
                    <SettingsIcon className={classes.icons} />
                </IconButton>
            </div>
            <CardContent className={classes.cardContent}>
                <table className={classes.lmsStatsTable}>
                    <thead className={classes.lmsStatsThead}>
                        <td className={clsx(classes.lmsStatsTd, classes.lmsStatsTdPlacement)}>#</td>
                        {statsColOrder.map((key: LMSColOrderKeys) => (
                            <td className={classes.lmsStatsHeaderTd}>{statNames[key]}</td>
                        ))}
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
