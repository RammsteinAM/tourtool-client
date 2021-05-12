import React from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { DBGameData, FetchedGameData, FetchedGames, FetchedPlayer, PlayersWithName } from '../../../types/entities';
import { getNormalizedGames } from '../../../utils/arrayUtils';
import { thirdPlaceIndex } from '../../../utils/constants';
import EliminationCard from '../Elimination/EliminationCard';
import tournamentStyles from '../Elimination/eliminationStyles';
import EliminationCardForWatch from './EliminationCardForWatch';

interface Props {
    games: { [index: string]: DBGameData<PlayersWithName> };
    columnNumber: number;
    numberOfGames: number;
    normalizedPlayers: { [id: number]: string };
    gameIndexesForActiveTables: { [index: string]: number };
}

const EliminationCardsForWatch = ({ games, columnNumber, numberOfGames, normalizedPlayers, gameIndexesForActiveTables }: Props) => {
    const numberOfColumns = Math.ceil((Math.log(Object.keys(games).length) / Math.log(2)));
    const classes = tournamentStyles();
    const { t } = useTranslation();

    return (<>
        {[...Array(numberOfGames).keys()].map(key => {
            const numberOfGame = key + 1;
            const game = games[`${columnNumber}-${numberOfGame}`];
            const thirdPlaceGame = games[thirdPlaceIndex];
            const player1Id = game?.player1 && game?.player1[0]?.id;
            const player2Id = game?.player2 && game?.player2[0]?.id;
            const thirdPlaceP1Id = thirdPlaceGame?.player1 && thirdPlaceGame.player1[0]?.id;
            const thirdPlaceP2Id = thirdPlaceGame?.player2 && thirdPlaceGame.player2[0]?.id;
            if (key === numberOfGames - 1 && columnNumber === numberOfColumns && games[thirdPlaceIndex]) {
                return (
                    <div className={classes.gameColumnWithThirdPlace} key={`gameCard_${columnNumber}_${key}`}>
                        <EliminationCardForWatch
                            games={games}
                            game={game}
                            normalizedPlayers={normalizedPlayers}
                            player1Id={player1Id}
                            player2Id={player2Id}
                            gameKey={`${columnNumber}-${numberOfGame}`}
                            gameIndexesForActiveTables={gameIndexesForActiveTables}
                        />
                        <div className={classes.gameCardThirdPlace}>
                            <div className={classes.gameColumnHeader}>
                                <span>{t('Third Place')}</span>
                            </div>
                            <EliminationCardForWatch
                                games={games}
                                game={thirdPlaceGame}
                                normalizedPlayers={normalizedPlayers}
                                player1Id={thirdPlaceP1Id}
                                player2Id={thirdPlaceP2Id}
                                gameKey={thirdPlaceIndex}
                                gameIndexesForActiveTables={gameIndexesForActiveTables}
                            />
                        </div>
                    </div>
                )
            }
            return (
                <EliminationCardForWatch
                    key={`gameCard_${columnNumber}_${numberOfGame}`}
                    games={games}
                    game={game}
                    normalizedPlayers={normalizedPlayers}
                    player1Id={player1Id}
                    player2Id={player2Id}
                    gameKey={`${columnNumber}-${numberOfGame}`}
                    gameIndexesForActiveTables={gameIndexesForActiveTables}
                />
            )
        }

        )}
    </>
    )
}

export default EliminationCardsForWatch
