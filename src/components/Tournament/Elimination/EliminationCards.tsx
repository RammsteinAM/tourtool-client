import React from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { FetchedPlayer } from '../../../types/entities';
import EliminationCard from './EliminationCard';
import tournamentStyles from './eliminationStyles';

interface Props {
    columnNumber: number;
    numberOfGames: number;
    normalizedPlayers: { [id: number]: FetchedPlayer }
}

const EliminationCards = ({ columnNumber, numberOfGames, normalizedPlayers }: Props) => {
    const entityState = useSelector((state: RootState) => state.entities);
    const numberOfPlayers = entityState.eliminationPlayers.length;
    const games = entityState.eliminationGames;
    const numberOfColumns = Math.ceil((Math.log(numberOfPlayers) / Math.log(2)));
    const classes = tournamentStyles();
    const { t } = useTranslation();

    return (<>
        {[...Array(numberOfGames).keys()].map(key => {
            const numberOfGame = key + 1;
            const game = games[`${columnNumber}-${numberOfGame}`];
            // const p1 = games[`${columnNumber}-${numberOfGame}`]?.player1;
            // const p2 = games[`${columnNumber}-${numberOfGame}`]?.player2;
            const player1Id = game?.player1Id;
            const player2Id = game?.player2Id;
            // const final1 = games[`final`]?.player1;
            // const final2 = games[`final`]?.player2;
            const finalist1Id = games[`final`]?.player1Id;
            const finalist2Id = games[`final`]?.player2Id;
            // const thirdPlaceP1 = games[`thirdPlace`]?.player1;
            // const thirdPlaceP2 = games[`thirdPlace`]?.player2;
            const thirdPlaceP1Id = games[`thirdPlace`]?.player1Id;
            const thirdPlaceP2Id = games[`thirdPlace`]?.player2Id;
            if (key === numberOfGames - 1 && columnNumber === numberOfColumns && entityState.tournament.thirdPlace) {
                return (
                    <div className={classes.gameColumnWithThirdPlace} key={`gameCard_${columnNumber}_${key}`}>
                        <EliminationCard
                            // player1={final1}
                            // player2={final2}
                            normalizedPlayers={normalizedPlayers}
                            player1Id={player1Id}
                            player2Id={player2Id}
                            active
                            gameKey={`${columnNumber}-${numberOfGame}`}
                        />
                        <div className={classes.gameCardThirdPlace}>
                            <div className={classes.gameColumnHeader}>
                                <span>{t('Third Place')}</span>
                            </div>
                            <EliminationCard
                                // player1={thirdPlaceP1}
                                // player2={thirdPlaceP2}
                                normalizedPlayers={normalizedPlayers}
                                player1Id={thirdPlaceP1Id}
                                player2Id={thirdPlaceP2Id}
                                active
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
                            // player1={final1}
                            // player2={final2}
                            normalizedPlayers={normalizedPlayers}
                            player1Id={finalist1Id}
                            player2Id={finalist2Id}
                            active
                            gameKey={`${columnNumber}-${numberOfGame}`}
                        />
                    </div>
                )
            }
            return (
                <EliminationCard
                    key={`gameCard_${columnNumber}_${numberOfGame}`}
                    // player1={p1}
                    // player2={p2}
                    normalizedPlayers={normalizedPlayers}
                    player1Id={player1Id}
                    player2Id={player2Id}
                    active
                    gameKey={`${columnNumber}-${numberOfGame}`}
                />
            )
        }

        )}
    </>
    )
}

export default EliminationCards
