import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import GameListRow from '../../components/Tournament/GameListRow';
import gameListRowStyles from './gameListRowStyles';

interface Props {
    roundNubmer: number;
    maxScores: number;
}

const GameListRound = ({ roundNubmer, maxScores }: Props) => {
    const entityState = useSelector((state: RootState) => state.entities);
    const classes = gameListRowStyles();
    const numberOfGames = Math.floor(entityState.lmsPlayers.length / 2);
    const { t } = useTranslation();

    return (
        <>
            <div className={classes.tournamentGameRound}>{t('Round', { round: roundNubmer })}</div>
            {[...Array(numberOfGames).keys()].map((i) =>
                <GameListRow
                    key={`gameListRow_${i}`}
                    tabIndex={10}
                    gameKey={`${roundNubmer}-${i + 1}`}
                    maxScores={maxScores}
                />
            )}
        </>
    )
}

export default GameListRound
