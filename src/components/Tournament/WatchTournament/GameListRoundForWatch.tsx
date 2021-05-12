import React from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { FetchedPlayer, FetchedTournamentForView } from '../../../types/entities';
import { splitGameKey } from '../../../utils/stringUtils';
import GameListRowForWatch from './GameListRowForWatch';
import { RootState } from '../../../redux/store';
import gameListRowStyles from '../gameListRowStyles';

interface Props {
    tournamentData: FetchedTournamentForView;
    roundNubmer: number;
    normalizedPlayers?: { [id: number]: string };
    searchFilterValue?: string;
}

const GameListRoundForWatch = ({ tournamentData, roundNubmer: roundNumber, normalizedPlayers, searchFilterValue }: Props) => {
    const storeGameData = useSelector((state: RootState) => state.games.data);
    const tournamentGamesData = tournamentData.games;
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
                            normalizedPlayers[player1[0].id] :
                            (player1?.length === 2 ? `${normalizedPlayers[player1[0].id]} / ${normalizedPlayers[player1[1].id]}` : '')) :
                        '';
                    const player2Name: string = normalizedPlayers && player1 ?
                        (player2?.length === 1 ?
                            normalizedPlayers[player2[0].id] :
                            (player2?.length === 2 ? `${normalizedPlayers[player2[0].id]} / ${normalizedPlayers[player2[1].id]}` : '')) :
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
                    return round === roundNumber && <GameListRowForWatch
                        tournamentData={tournamentData}
                        key={game.id}
                        gameKey={game.index}
                        normalizedPlayers={normalizedPlayers}
                    />
                }
                )}
        </>
    )
}

export default GameListRoundForWatch
