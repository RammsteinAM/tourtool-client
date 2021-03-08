import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { Games } from '../../types/entities';
import GameListRow from '../../components/Tournament/GameListRow';
import { debounce } from 'lodash';
import { useResizeDetector } from 'react-resize-detector';
import gameListRowStyles from './gameListRowStyles';

interface Props {
    roundNubmer: number;
    maxScores: number;
}

const GameListRound = ({ roundNubmer, maxScores }: Props) => {
    const [games, setGames] = useState<Games>({});
    const entityState = useSelector((state: RootState) => state.entities);
    const classes = gameListRowStyles();
    const { t } = useTranslation();

    // useEffect(() => {

    //     setGames({ ...entityState.eliminationGames })

    // }, [/* entityState.players */])



    //  debugger
    return (
        <>
            <div className={classes.tournamentGameRound}>{t('Round', { round: roundNubmer })}</div>
            {[...Array(Math.floor(entityState.lmsPlayers.length / 2)).keys()].map((i) =>
                <GameListRow
                    key={`gameListRow_${i}`}
                    gameKey={`${roundNubmer}-${i + 1}`}
                    maxScores={maxScores}
                />
            )}
        </>
    )
}

export default GameListRound
