import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { EliminationPlayers, StatePlayers } from '../../types/entities';
import tournamentStyles from './tournamentStyles';
import EliminationSidebar from './EliminationSidebar';
import { updatePlayers } from '../../redux/tournamentEntities/actions';

const initialPlayers = { 1: [] }

interface Props {
    players: EliminationPlayers
}

const EliminationTree = (props: Props) => {
    const entityState = useSelector((state: RootState) => state.entities);    
    const dispatch = useDispatch();
    const numberOfPlayers = entityState.players.length;
    const firstRoundGameNumber: number = 2 ** Math.ceil((Math.log(numberOfPlayers) / Math.log(2)) - 1);
    const byePlayerNumber: number = 2 ** Math.ceil(Math.log(numberOfPlayers) / Math.log(2)) - numberOfPlayers;
    const columns = Math.ceil((Math.log(numberOfPlayers) / Math.log(2)));
    const classes = tournamentStyles();
    const { t } = useTranslation();

    const getByeIndexes = (n: number) => {
        if (Math.log(32) / Math.log(2) % 1 !== 0) return null;
        return [
            2, n,
            n / 2, n / 2 + 2,
            n / 4, 3 * n / 4, n / 4 + 2, 3 * n / 4 + 2,
            n / 8, 5 * n / 8, 3 * n / 8, 7 * n / 8, n / 8 + 2, 5 * n / 8 + 2, 3 * n / 8 + 2, 7 * n / 8 + 2,
            n / 16, 9 * n / 16, 5 * n / 16, 13 * n / 16, 3 * n / 16, 11 * n / 16, 7 * n / 16, 15 * n / 16, n / 16 + 2, 9 * n / 16 + 2, 5 * n / 16 + 2, 13 * n / 16 + 2, 3 * n / 16 + 2, 11 * n / 16 + 2, 7 * n / 16 + 2
            //n / 32, 17 * n / 32, 9 * n / 32, 25 * n / 32, 5 * n / 32
        ]
    }

    const submitPlayersToStore = (newPlayers: StatePlayers) => {
        const storePlayers: StatePlayers = newPlayers
            .filter(player => !!player.name)
            .map((player, i) => {
                return { name: player.name, category: player.category, bye: player.bye }
            })

        dispatch(updatePlayers(storePlayers));
    }

    const insertByePlayers = (players: StatePlayers) => {
        let byePlayers = byePlayerNumber;
        const byeI = getByeIndexes(numberOfPlayers + byePlayerNumber);
        let kekw = 1;

        for (let i = 0; i < byePlayerNumber; i++) {
            if (byePlayers <= 0) break;
            if (byeI![i]) {
                players[byeI![i] - 1] = { name: "", category: null, bye: true }
            }
            else {
                const q = players.findIndex((x, i) => i % 2 !== 0 && !x?.bye && !players[i + 1]?.bye)
                players[q] = { name: "", category: null, bye: true }
            }
            byePlayers--;
        }
    }

    const renderTree = () => {
        const result = [];
        for (let colNumber = 1; colNumber <= columns; colNumber++) {
            const finalNumberDivider: number = 2 ** (columns - colNumber);
            result.push(
                <div>
                    <div className={classes.gameColumn} key={`column${colNumber}`}>
                        <div>
                            <div className={classes.gameColumnHeader}>
                                <span>{finalNumberDivider >= 4 && '1/' + finalNumberDivider} </span>
                                <span>{finalNumberDivider === 2 ? t('Semifinal') : t('Final', { count: finalNumberDivider })} </span>
                            </div>
                            <div className={classes.gameColumnContent}>
                                {renderCards(colNumber)}
                            </div>
                        </div>
                        {
                            columns - colNumber >= 1 &&
                            <div className={classes.gameBetweenColumnsSpace}>
                                {renderBetweenColumnSpaces(colNumber)}
                            </div>
                        }
                    </div>
                </div>
            )
        }
        return result;
    }

    const renderCards = (columnNumber: number) => {
        const result = [];
        const numberOfGames = firstRoundGameNumber / (2 ** (columnNumber - 1));
        for (let i = numberOfGames; i >= 1; i--) {
            //if (!players[columnNumber]) continue;
            const p1 = props.players[columnNumber] && props.players[columnNumber][(numberOfGames - i) * 2]
            const p2 = props.players[columnNumber] && props.players[columnNumber][(numberOfGames - i) * 2 + 1]
            if (p1?.bye || p2?.bye) {
                result.push(
                    <div className={classes.gameCardBye} key={`gameCard${i}`}>
                        {p1?.bye && !p2?.bye && <div>{p2?.name}</div>}
                        {p2?.bye && !p1?.bye && <div>{p1?.name}</div>}
                    </div>
                )
            }
            else {
                result.push(
                    <div className={classes.gameCard} key={`gameCard${i}`}>
                        <div>{p1?.name}
                        </div>
                        <div>{p2?.name}
                        </div>
                    </div>
                )
            }
        }
        return result;
    }

    const renderBetweenColumnSpaces = (columnNumber: number) => {
        const result = [];
        for (let i = firstRoundGameNumber / (2 ** (columnNumber - 1)) / 2; i >= 1; i--) {
            result.push(
                <div
                    style={{ height: `calc(4 * (25% - ${95 * firstRoundGameNumber / 8}px)/${firstRoundGameNumber / ((2 ** (columnNumber - 1)) * 2)})` }}
                    className={classes.gameBetweenColumnSpaceItem} key={`gameCard${i}`}
                >
                    <div className={classes.gameConnectiongLines_Top}></div>
                    <div className={classes.gameConnectiongLines_TopCorner}></div>
                    <div className={classes.gameConnectiongLines_MiddleV}></div>
                    <div className={classes.gameConnectiongLines_MiddleH}></div>
                    <div className={classes.gameConnectiongLines_BottomCorner}></div>
                    <div className={classes.gameConnectiongLines_Bottom}></div>
                </div>
            )
        }
        return result;
    }

    return (
        <div>

                <div className={classes.eliminationCardsContainer}>
                    {renderTree()}
                </div>
        </div>
    )
}

export default EliminationTree
