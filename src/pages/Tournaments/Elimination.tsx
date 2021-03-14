import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { EliminationGames } from '../../types/entities';
import { splitGameKey } from '../../utils/stringUtils';
import EliminationColumn from '../../components/Tournament/Elimination/EliminationColumn';
import EliminationCards from '../../components/Tournament/Elimination/EliminationCards';
import tournamentStyles from './tournamentStyles';

const Elimination = () => {
    const [games, setGames] = useState<EliminationGames>({});
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const firstRoundGameNumber = Object.keys(games).length === 1 ? 1 : Object.keys(games).filter(gameKey => splitGameKey(gameKey).round === 1).length;
    const numberOfColumns = Math.log(Object.keys(games).length + 1) / Math.log(2);
    const classes = tournamentStyles();
    const { t } = useTranslation();

    useEffect(() => {

        setGames({ ...entityState.eliminationGames })

    }, [])

    return (
        <div
            className={classes.eliminationCardsContainer}
            style={{ transform: `scale(${settingsState.eliminationScale || '1'})`, transformOrigin: 'top left', }}
        >
            {[...Array(numberOfColumns).keys()].map(key => {
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
                        />
                    </EliminationColumn>
                )
            }
            )}
        </div>
    )
}

export default Elimination
