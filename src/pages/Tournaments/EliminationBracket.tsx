import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DBGameData, EliminationGames, StateEliminationPlayers } from '../../types/entities';
import EliminationSidebar from '../../components/Tournament/Elimination/EliminationSidebar';
import { entityActions, resetEliminationGames, updateEliminationGames } from '../../redux/tournamentEntities/actions';
import CreateTournamentDialog from '../../components/Tournament/CreateTournamentDialog';
import { Redirect, useHistory } from 'react-router-dom';
import EliminationColumn from '../../components/Tournament/Elimination/EliminationColumn';
import EliminationBracketCards from '../../components/Tournament/Elimination/EliminationBracketCards';
import tournamentStyles from './tournamentStyles';
import { getNormalizedParticipants } from '../../utils/arrayUtils';
import { ActionStatus } from '../../types/main';

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

    const normalizedParticipants = getNormalizedParticipants(entityState.participants);

    useEffect(() => {
        if (entityState.fetchedTournaments.createdTournamentId && entityState.fetchedTournaments.status == ActionStatus.Success) {
            history.replace('/');
            history.push(`/elimination/${entityState.fetchedTournaments.createdTournamentId}`);
        }
    }, [entityState.fetchedTournaments.status, entityState.fetchedTournaments.createdTournamentId])

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
        const storeGames = generateStoreGames();
        dispatch(resetEliminationGames());
        dispatch(updateEliminationGames(storeGames));
        const dbGames: DBGameData[] = Object.values(storeGames).map(game => {
            if (typeof game.player1Id === 'number' && typeof game.player2Id === 'number') {
                return {
                    index: game.index,
                    player1: [{ id: game.player1Id }],
                    player2: [{ id: game.player2Id }],
                    hasByePlayer: game.hasByePlayer,
                }
            }
            if (typeof game.player1Id === 'object' || typeof game.player2Id === 'object') {
                return {
                    index: game.index,
                    player1: typeof game.player1Id === 'object' ?
                        [{ id: game.player1Id[0] }, { id: game.player1Id[1] }] :
                        [{ id: game.player1Id }],
                    player2: typeof game.player2Id === 'object' ?
                        [{ id: game.player2Id[0] }, { id: game.player2Id[1] }] :
                        [{ id: game.player2Id }],
                    hasByePlayer: game.hasByePlayer,
                }
            }
            return {
                index: game.index,
                hasByePlayer: game.hasByePlayer,
            }
        })
        const { draw, numberOfGoals, numberOfLives, numberOfTables, pointsForDraw, pointsForWin, sets, goals } = entityState.tournament;
        dispatch(entityActions.createTournament({
            name,
            sets: sets || 1,
            tournamentTypeId: 1,
            draw,
            numberOfGoals: goals ? numberOfGoals : 0,
            numberOfLives,
            numberOfTables,
            pointsForDraw,
            pointsForWin,
            games: dbGames
        }));

    };

    const getByeIndexes = (n: number) => {
        // if (Math.log(32) / Math.log(2) % 1 !== 0) return null;
        return [
            2, n,
            n / 2, n / 2 + 2,
            n / 4, 3 * n / 4, n / 4 + 2, 3 * n / 4 + 2,
            n / 8, 5 * n / 8, 3 * n / 8, 7 * n / 8, n / 8 + 2, 5 * n / 8 + 2, 3 * n / 8 + 2, 7 * n / 8 + 2,
            n / 16, 9 * n / 16, 5 * n / 16, 13 * n / 16, 3 * n / 16, 11 * n / 16, 7 * n / 16, 15 * n / 16, n / 16 + 2, 9 * n / 16 + 2, 5 * n / 16 + 2, 13 * n / 16 + 2, 3 * n / 16 + 2, 11 * n / 16 + 2, 7 * n / 16 + 2,
            n / 32, 17 * n / 32, 9 * n / 32, 25 * n / 32, 5 * n / 32, 21 * n / 32, 13 * n / 32, 29 * n / 32
        ]
    }

    const generateStoreGames = (): EliminationGames => {
        const storeGames: EliminationGames = {};
        for (let col = 1; col <= numberOfColumns; col++) {
            const prevCol = col - 1;
            for (let i = 0, j = 1; i < players.length / (2 ** prevCol); i = i + 2, j++) {
                const gameKey: string = `${col}-${j}`;
                storeGames[gameKey] = { player1Id: 0, player2Id: 0, index: gameKey }
                if (col === 1) {
                    const { id: player1Id } = players[i];
                    const { id: player2Id } = players[i + 1];
                    storeGames[gameKey].player1Id = player1Id || 0;
                    storeGames[gameKey].player2Id = player2Id || 0;
                    if (players[i].bye || players[i + 1].bye) {
                        storeGames[gameKey].hasByePlayer = true;
                    }
                    continue;
                }

                const parent1GameKey = `${col - 1}-${j * 2 - 1}`;
                const parent2GameKey = `${col - 1}-${j * 2}`;
                const p1Game = storeGames[parent1GameKey]; // first parent game
                const p2Game = storeGames[parent2GameKey]; // second parent game
                const {
                    p1p1,
                    p1p2, // 1st parent's 2nd player
                    p2p1,
                    p2p2,
                    parent1HasByePlayer,
                    parent1HasNoPlayer,
                    parent1HasOnePlayer,
                    parent2HasByePlayer,
                    parent2HasNoPlayer,
                    parent2HasOnePlayer,
                } = {
                    p1p1: p1Game?.player1Id,
                    p1p2: p1Game?.player2Id,
                    parent1HasByePlayer: p1Game?.hasByePlayer,
                    parent1HasOnePlayer: (p1Game?.player1Id && !p1Game?.player2Id) || (p1Game?.player2Id && !p1Game?.player1Id),
                    parent1HasNoPlayer: !p1Game?.player1Id && !p1Game?.player2Id,
                    p2p1: p2Game?.player1Id,
                    p2p2: p2Game?.player2Id,
                    parent2HasByePlayer: p2Game?.hasByePlayer,
                    parent2HasOnePlayer: (p2Game?.player1Id && !p2Game?.player2Id) || (p2Game?.player2Id && !p2Game?.player1Id),
                    parent2HasNoPlayer: !p2Game?.player1Id && !p2Game?.player2Id,
                };

                if ((parent2HasNoPlayer || parent1HasNoPlayer) && ((parent1HasByePlayer && parent2HasOnePlayer) || (parent2HasByePlayer && parent1HasOnePlayer))) {
                    storeGames[gameKey].hasByePlayer = true;
                }
                if (parent2HasNoPlayer && parent1HasNoPlayer) {
                    storeGames[gameKey].hasByePlayer = true;
                }
                if (!parent1HasByePlayer && !parent2HasByePlayer) {
                    continue;
                }
                if (parent1HasOnePlayer && parent1HasByePlayer) {
                    storeGames[gameKey].player1Id = p1p1 || p1p2;
                }
                if (parent2HasOnePlayer && parent2HasByePlayer) {
                    storeGames[gameKey].player2Id = p2p1 || p2p2;
                }
            }

        }
        if (entityState.tournament.thirdPlace) {
            storeGames['thirdPlace'] = { player1Id: 0, player2Id: 0, index: 'thirdPlace' }
        }
        // players.forEach(player => {
        //     storeGame
        // })
        return storeGames;
    }

    const insertByePlayers = (players: StateEliminationPlayers) => {
        let byePlayers = byePlayerNumber;
        const byeI = getByeIndexes(numberOfPlayers + byePlayerNumber);

        for (let i = 0; i < byePlayerNumber; i++) {
            if (byePlayers <= 0) break;
            if (byeI![i]) {
                players[byeI![i] - 1] = { id: 0, category: null, bye: true }
            }
            else {
                const q = players.findIndex((x, i) => i % 2 !== 0 && !x?.bye && !players[i + 1]?.bye)
                players[q] = { id: 0, category: null, bye: true }
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
                        // const roundNumberDenominator: number = 2 ** (numberOfColumns - colNumber);
                        const numberOfGames = firstRoundGameNumber / (2 ** (colNumber - 1));
                        return (
                            <EliminationColumn
                                key={key}
                                numberOfColumns={numberOfColumns}
                                firstRoundGameNumber={firstRoundGameNumber}
                                colNumber={colNumber}
                            >
                                <EliminationBracketCards
                                    players={players}
                                    columnNumber={colNumber}
                                    numberOfGames={numberOfGames}
                                    normalizedPlayers={normalizedParticipants}
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
