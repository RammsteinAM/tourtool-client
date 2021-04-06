import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import GameListRow from '../../components/Tournament/GameListRow';
import { FetchedPlayer } from '../../types/entities';
import gameListRowStyles from './gameListRowStyles';
import { splitGameKey } from '../../utils/stringUtils';

interface Props {
    tournamentId: number;
    roundNubmer: number;
    maxScores: number;
    normalizedPlayers?: { [id: number]: FetchedPlayer }
}

const GameListRound = ({ tournamentId, roundNubmer, maxScores, normalizedPlayers }: Props) => {    
    const storeGameData = useSelector((state: RootState) => state.games.data);
    const classes = gameListRowStyles();
    const { t } = useTranslation();
    // const numberOfGames = Object.keys(storeGameData[tournamentId]).filter(key => splitGameKey(key).round === roundNubmer).length;

    return (
        <>
            <div className={classes.tournamentGameRound}>{t('Round', { round: roundNubmer })}</div>
            {storeGameData[tournamentId]?.map((game) =>
                <GameListRow
                    key={game.id}
                    tournamentId={tournamentId}
                    tabIndex={10}
                    gameKey={game.index}
                    maxScores={maxScores}
                    normalizedPlayers={normalizedPlayers}
                />
            )}
        </>
    )
}

export default GameListRound
