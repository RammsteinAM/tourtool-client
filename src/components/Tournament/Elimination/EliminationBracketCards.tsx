import React from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { FetchedPlayer, StateEliminationPlayers, StateParticipant } from '../../../types/entities';
import EliminationBracketCard from './EliminationBracketCard';
import tournamentStyles from './eliminationStyles';

interface Props {
    players: StateEliminationPlayers;
    columnNumber: number;
    numberOfGames: number;
    normalizedPlayers: { [id: number]: FetchedPlayer }
}

const EliminationBracketCards = ({ players, columnNumber, numberOfGames, normalizedPlayers }: Props) => {
    const entityState = useSelector((state: RootState) => state.entities);
    const numberOfPlayers = entityState.eliminationPlayers.length;
    const numberOfColumns = Math.ceil((Math.log(numberOfPlayers) / Math.log(2)));
    const classes = tournamentStyles();
    const { t } = useTranslation();

    return (<>
        {[...Array(numberOfGames).keys()].map(key => {
            const p1 = columnNumber === 1 ? players[key * 2] : null
            const p2 = columnNumber === 1 ? players[key * 2 + 1] : null
            if (key === numberOfGames - 1 && columnNumber === numberOfColumns && entityState.tournament.thirdPlace) {
                return (
                    <div className={classes.gameColumnWithThirdPlace} key={`gameCard_${columnNumber}_${key}`}>
                        <EliminationBracketCard
                            key={`gameCard_${columnNumber}_${key}`}

                        />
                        <div className={classes.gameCardThirdPlace}>
                            <div className={classes.gameColumnHeader}>
                                <span>{t('Third Place')}</span>
                            </div>
                            <EliminationBracketCard
                                key={`gameCard_${columnNumber}_${key}`}
                            />
                        </div>
                    </div>
                )
            }
            return (
                <EliminationBracketCard
                    key={`gameCard_${columnNumber}_${key}`}
                    // player1={p1?.name}
                    // player2={p2?.name}
                    player1Id={p1?.id}
                    player2Id={p2?.id}
                    normalizedPlayers={normalizedPlayers}
                />
            )
        }

        )}
    </>
    )
}

export default EliminationBracketCards
