import React from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { FetchedGameData, FetchedGames, FetchedPlayer } from '../../../types/entities';
import { getNormalizedGames } from '../../../utils/arrayUtils';
import EliminationCard from './EliminationCard';
import tournamentStyles from './eliminationStyles';

interface Props {    
    games: { [index: string]: FetchedGameData };
    columnNumber: number;
    numberOfGames: number;
    normalizedPlayers: { [id: number]: FetchedPlayer }
}

const EliminationCards = ({ games, columnNumber, numberOfGames, normalizedPlayers }: Props) => {
    const entityState = useSelector((state: RootState) => state.entities);
    // const fetchedGames: FetchedGames = useSelector((state: RootState) => state.entities.fetchedTournaments.data);
    const numberOfPlayers = entityState.eliminationPlayers.length;
    // const games = entityState.eliminationGames;
    // const games = getNormalizedGames(fetchedGames);
    const numberOfColumns = Math.ceil((Math.log(numberOfPlayers) / Math.log(2)));
    const classes = tournamentStyles();
    const { t } = useTranslation();

    return (<>
        {[...Array(numberOfGames).keys()].map(key => {
            const numberOfGame = key + 1;
            const game = games[`${columnNumber}-${numberOfGame}`];
            const thirdPlaceGame = games[`thirdPlace`];
            const player1Id = game?.player1 && game?.player1[0]?.id;
            const player2Id = game?.player2 && game?.player2[0]?.id;
            const thirdPlaceP1Id = games[`thirdPlace`]?.player1 && games[`thirdPlace`]?.player1[0]?.id;
            const thirdPlaceP2Id = games[`thirdPlace`]?.player2 && games[`thirdPlace`]?.player2[0]?.id;
            if (key === numberOfGames - 1 && columnNumber === numberOfColumns && entityState.tournament.thirdPlace) {
                return (
                    <div className={classes.gameColumnWithThirdPlace} key={`gameCard_${columnNumber}_${key}`}>
                        <EliminationCard
                            games={games}
                            game={game}
                            normalizedPlayers={normalizedPlayers}
                            player1Id={player1Id}
                            player2Id={player2Id}
                            gameKey={`${columnNumber}-${numberOfGame}`}
                        />
                        <div className={classes.gameCardThirdPlace}>
                            <div className={classes.gameColumnHeader}>
                                <span>{t('Third Place')}</span>
                            </div>
                            <EliminationCard
                                games={games}
                                game={thirdPlaceGame}
                                normalizedPlayers={normalizedPlayers}
                                player1Id={thirdPlaceP1Id}
                                player2Id={thirdPlaceP2Id}
                                gameKey={`thirdPlace`}
                            />
                        </div>
                    </div>
                )
            }
            if (key === numberOfGames - 1 && columnNumber === numberOfColumns) {
                return (
                    <div className={classes.gameColumnWithThirdPlace} key={`gameCard_${columnNumber}_${key}`}>
                        <EliminationCard
                            games={games}
                            game={game}
                            normalizedPlayers={normalizedPlayers}
                            player1Id={player1Id}
                            player2Id={player2Id}
                            gameKey={`${columnNumber}-${numberOfGame}`}
                        />
                    </div>
                )
            }
            return (
                <EliminationCard
                    key={`gameCard_${columnNumber}_${numberOfGame}`}
                    games={games}
                    game={game}
                    normalizedPlayers={normalizedPlayers}
                    player1Id={player1Id}
                    player2Id={player2Id}
                    gameKey={`${columnNumber}-${numberOfGame}`}
                />
            )
        }

        )}
    </>
    )
}

export default EliminationCards
