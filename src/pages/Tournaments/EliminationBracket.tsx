import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { EliminationGames, EliminationPlayers, StateGames, StateEliminationPlayers } from '../../types/entities';
import EliminationSidebar from '../../components/Tournament/EliminationSidebar';
import { resetEliminationGames, resetGames, updateEliminationGames } from '../../redux/tournamentEntities/actions';
import CreateTournamentDialog from '../../components/Tournament/CreateTournamentDialog';
import tournamentStyles from './tournamentStyles';
import { useHistory } from 'react-router-dom';
import EliminationCard from './EliminationCard';

const initialPlayers = []

interface Props {

}

const EliminationBracket = (props: Props) => {
    const [players, setPlayers] = useState<StateEliminationPlayers>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const dispatch = useDispatch();
    const numberOfPlayers = entityState.eliminationPlayers.length;
    const firstRoundGameNumber: number = 2 ** Math.ceil((Math.log(numberOfPlayers) / Math.log(2)) - 1);
    const byePlayerNumber: number = 2 ** Math.ceil(Math.log(numberOfPlayers) / Math.log(2)) - numberOfPlayers;
    const columns = Math.ceil((Math.log(numberOfPlayers) / Math.log(2)));
    const classes = tournamentStyles();
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        const newPlayers: StateEliminationPlayers = [];
        const tempPlayers: StateEliminationPlayers = [...entityState.eliminationPlayers];
        insertByePlayers(newPlayers);
        for (let i = 0; i < numberOfPlayers + byePlayerNumber; i++) {
            if (newPlayers[i]?.bye) continue;
            newPlayers[i] = tempPlayers[0];
            tempPlayers.shift();
        }
        setPlayers([...newPlayers])
    }, [entityState.eliminationPlayers])

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleStartTournament = (e: React.FormEvent, name: string) => {
        e.preventDefault();
        submitGamesToStore();
        history.push('/elimination');
    };

    const getByeIndexes = (n: number) => {
        if (Math.log(32) / Math.log(2) % 1 !== 0) return null;
        return [
            2, n,
            n / 2, n / 2 + 2,
            n / 4, 3 * n / 4, n / 4 + 2, 3 * n / 4 + 2,
            n / 8, 5 * n / 8, 3 * n / 8, 7 * n / 8, n / 8 + 2, 5 * n / 8 + 2, 3 * n / 8 + 2, 7 * n / 8 + 2,
            n / 16, 9 * n / 16, 5 * n / 16, 13 * n / 16, 3 * n / 16, 11 * n / 16, 7 * n / 16, 15 * n / 16, n / 16 + 2, 9 * n / 16 + 2, 5 * n / 16 + 2, 13 * n / 16 + 2, 3 * n / 16 + 2, 11 * n / 16 + 2, 7 * n / 16 + 2,
            n / 32, 17 * n / 32, 9 * n / 32, 25 * n / 32, 5 * n / 32
        ]
    }

    const submitGamesToStore = () => {
        const storeGames: EliminationGames = {};
        for (let col = 1; col <= columns; col++) {
            const prevCol = col - 1;
            for (let i = 0, j = 1; i < players.length / (2 ** prevCol); i = i + 2, j++) {
                const gameKey: string = col === columns ? 'final' : `${col}-${j}`;
                storeGames[gameKey] = { player1: '', player2: '', index: gameKey }
                if (col === 1) {
                    storeGames[gameKey].player1 = players[i].name;
                    storeGames[gameKey].player2 = players[i + 1].name;
                    if (players[i].bye || players[i + 1].bye) {
                        storeGames[gameKey].hasByePlayer = true;
                    }
                    continue;
                }

                // parent X player Y
                const { p1p1, p1p2, parent1HasByePlayer } = { p1p1: storeGames[`${prevCol}-${j * 2 - 1}`].player1, p1p2: storeGames[`${prevCol}-${j * 2 - 1}`].player2, parent1HasByePlayer: storeGames[`${prevCol}-${j * 2 - 1}`].hasByePlayer };
                const { p2p1, p2p2, parent2HasByePlayer } = { p2p1: storeGames[`${prevCol}-${j * 2}`].player1, p2p2: storeGames[`${prevCol}-${j * 2}`].player2, parent2HasByePlayer: storeGames[`${prevCol}-${j * 2}`].hasByePlayer };
                const parent1HasNoPlayer = !p1p1 && !p1p2;
                const parent1HasOnePlayer = (p1p1 && !p1p2) || (p1p2 && !p1p1);
                const parent2HasNoPlayer = !p2p1 && !p2p2;
                const parent2HasOnePlayer = (p2p1 && !p2p2) || (p2p2 && !p2p1);
                if ((parent2HasNoPlayer || parent1HasNoPlayer) && ((parent1HasByePlayer && parent2HasOnePlayer) || (parent2HasByePlayer && parent1HasOnePlayer))) {
                    storeGames[gameKey].hasByePlayer = true;
                }
                if (!parent1HasByePlayer && !parent2HasByePlayer) {
                    continue;
                }
                if (parent1HasOnePlayer) {
                    storeGames[gameKey].player1 = p1p1 || p1p2;
                }
                if (parent2HasOnePlayer) {
                    storeGames[gameKey].player2 = p2p1 || p2p2;
                }
            }

        }
        // players.forEach(player => {
        //     storeGame
        // })
        dispatch(resetEliminationGames());
        dispatch(updateEliminationGames(storeGames));
    }

    const insertByePlayers = (players: StateEliminationPlayers) => {
        let byePlayers = byePlayerNumber;
        const byeI = getByeIndexes(numberOfPlayers + byePlayerNumber);

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

    const handleSidebarChange = (players: StateEliminationPlayers) => {
        setPlayers([...players])
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()
        handleDialogOpen();
    }

    const renderTree = () => {
        const result = [];
        for (let colNumber = 1; colNumber <= columns; colNumber++) {
            const finalNumberDivider: number = 2 ** (columns - colNumber);
            result.push(
                <div key={`gameColumn_${colNumber}`}>
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
            const p1 = columnNumber === 1 ? players[(numberOfGames - i) * 2] : null
            const p2 = columnNumber === 1 ? players[(numberOfGames - i) * 2 + 1] : null
            if (i === 1 && columnNumber === columns && entityState.tournament.thirdPlace) {
                result.push(
                    <div className={classes.gameColumnWithThirdPlace} key={`gameCard_${columnNumber}_${i}`}>
                        <EliminationCard
                            key={`gameCard_${columnNumber}_${i}`}

                        />
                        <div className={classes.gameCardThirdPlace}>
                            <div className={classes.gameColumnHeader}>
                                <span>{t('Third Place')}</span>
                            </div>
                            <EliminationCard
                                key={`gameCard_${columnNumber}_${i}`}
                            />
                        </div>
                    </div>
                )
                continue;
            }
            result.push(
                <EliminationCard
                    key={`gameCard_${columnNumber}_${i}`}
                    player1={p1?.name}
                    player2={p2?.name}
                />
            )
        }
        return result;
    }

    const renderBetweenColumnSpaces = (columnNumber: number) => {
        const result = [];
        for (let i = firstRoundGameNumber / (2 ** (columnNumber - 1)) / 2; i >= 1; i--) {
            result.push(
                <div
                    key={`gameCardLines_${columnNumber}_${i}`}
                    style={{ height: `calc(4 * (25% - ${95 * firstRoundGameNumber / 8}px)/${firstRoundGameNumber / ((2 ** (columnNumber - 1)) * 2)})` }}
                    className={classes.gameBetweenColumnSpaceItem}
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
        <>
            <form className={classes.form} onSubmit={handleSubmit} id='elimination-form'>
                <EliminationSidebar
                    players={players}
                    onChange={handleSidebarChange}
                />
                <div className={classes.eliminationBracketCardsContainer}>
                    {renderTree()}
                </div>
            </form>
            <CreateTournamentDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onSubmit={handleStartTournament}
            />
        </>
    )
}

export default EliminationBracket
