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
    normalizedPlayers?: { [id: number]: FetchedPlayer };
    searchFilterValue?: string;
}

const GameListRound = ({ tournamentId, roundNubmer: roundNumber, maxScores, normalizedPlayers, searchFilterValue }: Props) => {
    const storeGameData = useSelector((state: RootState) => state.games.data);
    const tournamentGamesData = storeGameData[tournamentId];
    const classes = gameListRowStyles();
    const { t } = useTranslation();

    return (
        <>
            <div className={classes.tournamentGameRound}>{t('Round', { round: roundNumber })}</div>
            {tournamentGamesData && tournamentGamesData
                .filter(game => {
                    const filter = searchFilterValue?.toLowerCase();
                    if (!filter) {
                        return game;
                    }
                    const player1 = game.player1;
                    const player2 = game.player2;
                    const player1Name: string = normalizedPlayers && player1 ?
                        (player1?.length === 1 ?
                            normalizedPlayers[player1[0].id]?.name :
                            (player1?.length === 2 ? `${normalizedPlayers[player1[0].id]?.name} / ${normalizedPlayers[player1[1].id]?.name}` : '')) :
                        '';
                    const player2Name: string = normalizedPlayers && player1 ?
                        (player2?.length === 1 ?
                            normalizedPlayers[player2[0].id]?.name :
                            (player2?.length === 2 ? `${normalizedPlayers[player2[0].id]?.name} / ${normalizedPlayers[player2[1].id]?.name}` : '')) :
                        '';
                        
                    if (player1Name.toLowerCase().indexOf(filter) >= 0 || player2Name.toLowerCase().indexOf(filter) >= 0) {
                        return game;
                    }
                })
                .sort((a, b) => {
                    if (splitGameKey(a.index).gameNumber > splitGameKey(b.index).gameNumber) {
                        return 1;
                    }
                    return -1;
                })
                .map(game => {
                    const round = splitGameKey(game.index).round;

                    return round === roundNumber && <GameListRow
                        key={game.id}
                        tournamentId={tournamentId}
                        tabIndex={10}
                        gameKey={game.index}
                        maxScores={maxScores}
                        normalizedPlayers={normalizedPlayers}
                    />
                }
                )}
        </>
    )
}

export default GameListRound
