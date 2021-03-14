import React from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { StateEliminationPlayers } from '../../../types/entities';
import EliminationCard from './EliminationCard';
import tournamentStyles from './eliminationStyles';

interface Props {
    columnNumber: number;
    numberOfGames: number;
}

const EliminationCards = ({ columnNumber, numberOfGames }: Props) => {
    const entityState = useSelector((state: RootState) => state.entities);
    const numberOfPlayers = entityState.eliminationPlayers.length;
    const games = entityState.eliminationGames;
    const numberOfColumns = Math.ceil((Math.log(numberOfPlayers) / Math.log(2)));
    const classes = tournamentStyles();
    const { t } = useTranslation();

    return (<>
        {[...Array(numberOfGames).keys()].map(key => {
            debugger
            const numberOfGame = key + 1;
            const p1 = games[`${columnNumber}-${numberOfGame}`]?.player1;
            const p2 = games[`${columnNumber}-${numberOfGame}`]?.player2;
            const final1 = games[`final`]?.player1;
            const final2 = games[`final`]?.player2;
            const thirdPlaceP1 = games[`thirdPlace`]?.player1;
            const thirdPlaceP2 = games[`thirdPlace`]?.player2;
            if (key === numberOfGames - 1 && columnNumber === numberOfColumns && entityState.tournament.thirdPlace) {
                return (
                    <div className={classes.gameColumnWithThirdPlace} key={`gameCard_${columnNumber}_${key}`}>
                        <EliminationCard
                            player1={final1}
                            player2={final2}
                            active
                            gameKey={`final`}
                        />
                        <div className={classes.gameCardThirdPlace}>
                            <div className={classes.gameColumnHeader}>
                                <span>{t('Third Place')}</span>
                            </div>
                            <EliminationCard
                                player1={thirdPlaceP1}
                                player2={thirdPlaceP2}
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
                            player1={final1}
                            player2={final2}
                            active
                            gameKey={`final`}
                        />
                    </div>
                )
            }
            return (
                <EliminationCard
                    key={`gameCard_${columnNumber}_${numberOfGame}`}
                    player1={p1}
                    player2={p2}
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
