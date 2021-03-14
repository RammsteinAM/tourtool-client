import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { EliminationGames, StateEliminationPlayers } from '../../types/entities';
import EliminationSidebar from '../../components/Tournament/Elimination/EliminationSidebar';
import { resetEliminationGames, resetGames, updateEliminationGames } from '../../redux/tournamentEntities/actions';
import CreateTournamentDialog from '../../components/Tournament/CreateTournamentDialog';
import { useHistory } from 'react-router-dom';
import EliminationColumn from '../../components/Tournament/Elimination/EliminationColumn';
import tournamentStyles from './tournamentStyles';
import EliminationBracketCards from '../../components/Tournament/Elimination/EliminationBracketCards';

const EliminationBracket = () => {
    const [players, setPlayers] = useState<StateEliminationPlayers>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const dispatch = useDispatch();
    const numberOfPlayers = entityState.eliminationPlayers.length;
    const firstRoundGameNumber: number = 2 ** Math.ceil((Math.log(numberOfPlayers) / Math.log(2)) - 1);
    const byePlayerNumber: number = 2 ** Math.ceil(Math.log(numberOfPlayers) / Math.log(2)) - numberOfPlayers;
    const numberOfColumns = Math.ceil((Math.log(numberOfPlayers) / Math.log(2)));
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
        for (let col = 1; col <= numberOfColumns; col++) {
            const prevCol = col - 1;
            for (let i = 0, j = 1; i < players.length / (2 ** prevCol); i = i + 2, j++) {
                const gameKey: string = col === numberOfColumns ? 'final' : `${col}-${j}`;
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

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit} id='elimination-form'>
                <EliminationSidebar
                    players={players}
                    onChange={handleSidebarChange}
                />
                <div className={classes.eliminationBracketCardsContainer}>
                    {[...Array(numberOfColumns).keys()].map(key => {
                        const colNumber = key + 1;
                        const roundNumberDenominator: number = 2 ** (numberOfColumns - colNumber);
                        const numberOfGames = firstRoundGameNumber / (2 ** (colNumber - 1));
                        return (
                            <EliminationColumn
                                numberOfColumns={numberOfColumns}
                                firstRoundGameNumber={firstRoundGameNumber}
                                colNumber={colNumber}
                            >
                                <EliminationBracketCards
                                    players={players}
                                    columnNumber={colNumber}
                                    numberOfGames={numberOfGames}
                                />
                            </EliminationColumn>
                        )
                    }
                    )}
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
