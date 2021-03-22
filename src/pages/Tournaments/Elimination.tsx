import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { EliminationGames } from '../../types/entities';
import { splitGameKey } from '../../utils/stringUtils';
import EliminationColumn from '../../components/Tournament/Elimination/EliminationColumn';
import EliminationCards from '../../components/Tournament/Elimination/EliminationCards';
import tournamentStyles from './tournamentStyles';
import { getNormalizedParticipants } from '../../utils/arrayUtils';

const Elimination = () => {
    const [games, setGames] = useState<EliminationGames>({});
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const firstRoundGameNumber = Object.keys(entityState.eliminationGames).length === 1 ? 1 : Object.keys(games).filter(gameKey => splitGameKey(gameKey).round === 1).length;
    const numberOfColumns = Math.log(Object.keys(entityState.eliminationGames).length + 1 - Number(entityState.tournament.thirdPlace)) / Math.log(2);
    const classes = tournamentStyles();

    const normalizedParticipants = getNormalizedParticipants(entityState.participants);
    
    useEffect(() => {
        setGames({ ...entityState.eliminationGames });
    }, [])

    return (
        <div
            className={classes.eliminationCardsContainer}
            style={{ transform: `scale(${settingsState.eliminationScale || '1'})`, transformOrigin: 'top left', }}
        >
            {[...Array(Math.round(numberOfColumns)).keys()].map(key => {
                const colNumber = key + 1;
                const numberOfGames = firstRoundGameNumber / (2 ** (colNumber - 1));
                return (
                    <EliminationColumn
                        numberOfColumns={numberOfColumns}
                        firstRoundGameNumber={firstRoundGameNumber}
                        colNumber={colNumber}
                    >
                        <EliminationCards
                            columnNumber={colNumber}
                            numberOfGames={numberOfGames}
                            normalizedPlayers={normalizedParticipants}
                        />
                    </EliminationColumn>
                )
            }
            )}
        </div>
    )
}

export default Elimination
