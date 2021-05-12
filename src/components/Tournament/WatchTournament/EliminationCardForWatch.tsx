import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import { DBGameData, FetchedGameData, FetchedPlayer, GameUpdateReqData, PlayersWithName, StateEliminationGame, StateScore } from '../../../types/entities';
import EnterScoreDialog from '../EnterScore/EnterScoreDialog';
import { getMultipleSetScores } from '../../../utils/scoreUtils';
import { gameActions } from '../../../redux/games/actions';
import { useParams } from 'react-router-dom';
import eliminationSidebarStyles from '../Elimination/eliminationSidebarStyles';

interface Props {
    games: { [index: string]: DBGameData<PlayersWithName> };
    game: DBGameData<PlayersWithName>;
    player1Id?: number | [number, number];
    player2Id?: number | [number, number];
    normalizedPlayers?: { [id: number]: string }
    gameKey: string;
    gameIndexesForActiveTables: { [index: string]: number };
}

const EliminationCardForWatch = (props: Props) => {
    const [scoreDialogOpen, setScoreDialogOpen] = useState<boolean>(false);
    const [scores, setScores] = useState<{ 1: number, 2: number }>();
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10)
    const fethchedTournamentData = useSelector((state: RootState) => state.entities.fetchedTournaments.data);
    const fethchedTournament = fethchedTournamentData[tournamentId]
    const dispatch = useDispatch();
    const classes = eliminationSidebarStyles();
    const { t } = useTranslation();

    useEffect(() => {
        let score1, score2;
        if (!game) {
            return;
        }
        if (game.scores1 && game.scores2) {
            score1 = getMultipleSetScores(game.scores1, game.scores2, Object.keys(game.scores1).length).score1;
            score2 = getMultipleSetScores(game.scores1, game.scores2, Object.keys(game.scores1).length).score2;
        }
        if (typeof score1 === 'number' && typeof score2 === 'number') {
            setScores({ 1: score1, 2: score2 })
        }

    }, [props.game?.scores1, props.game?.scores2])

    const game = props.game;
    if (!game) {
        return null;
    }
    const player1 = game.player1;
    const player2 = game.player2;
    let player1Name = '';
    let player2Name = '';

    switch (player1?.length) {
        case 1:
            player1Name = props.normalizedPlayers ? props.normalizedPlayers[player1[0].id] : ''
            break;
        case 2:
            player1Name = props.normalizedPlayers ? `${props.normalizedPlayers[player1[0].id]} / ${props.normalizedPlayers[player1[1].id]}` : ''
            break;
    }
    switch (player2?.length) {
        case 1:
            player2Name = props.normalizedPlayers ? props.normalizedPlayers[player2[0].id] : ''
            break;
        case 2:
            player2Name = props.normalizedPlayers ? `${props.normalizedPlayers[player2[0].id]} / ${props.normalizedPlayers[player2[1].id]}` : ''
            break;
    }

    const isBye = props.games && props.games[props.gameKey]?.hasByePlayer;

    let score1, score2;
    if (game.scores1 && game.scores2) {
        score1 = getMultipleSetScores(game.scores1, game.scores2, Object.keys(game.scores1).length).score1;
        score2 = getMultipleSetScores(game.scores1, game.scores2, Object.keys(game.scores1).length).score2;
    }

    let winner = null;
    if (score1 !== undefined && score2 !== undefined && score1 > score2) {
        winner = player1Name;
    }
    if (score1 !== undefined && score2 !== undefined && score1 < score2) {
        winner = player2Name;
    }

    if (isBye) {
        return (
            <div className={classes.gameCardBye}>
                {!player1Name && player2Name && <div>{player2Name}</div>}
                {!player2Name && player1Name && <div>{player1Name}</div>}
            </div>
        );
    }

    return (
        <div className={classes.gameCard}>
            <div className={winner && winner === player2Name ? classes.loser : undefined}>
                {player1Name}
            </div>
            <div className={winner === player1Name ? classes.loser : undefined}>
                {player2Name}
            </div>
            {score1 !== undefined && score2 !== undefined ?
                <div className={classes.gameCardScore}>
                    <div>{scores?.[1]}</div>
                    <div>{scores?.[2]}</div>
                </div> :
                <div className={classes.gameCardScore}>{t('vs')}</div>
            }
            {(props.gameIndexesForActiveTables && props.gameIndexesForActiveTables[props.gameKey]) ?
                <div className={classes.gameCardActiveTable} >
                    {props.gameIndexesForActiveTables[props.gameKey]}
                </div> : null
            }
        </div>
    )
}

export default EliminationCardForWatch
