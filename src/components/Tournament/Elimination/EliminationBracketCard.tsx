import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import { FetchedPlayer, StateEliminationGame, StateScore } from '../../../types/entities';
import eliminationSidebarStyles from './eliminationSidebarStyles';

interface Props {
    player1Id?: number | [number, number];
    player2Id?: number | [number, number];
    normalizedPlayers?: { [id: number]: FetchedPlayer }
    gameKey?: string;
}

const EliminationBracketCard = (props: Props) => {
    const [game, setGame] = useState<StateEliminationGame>();
    const gamesState = useSelector((state: RootState) => state.entities.eliminationGames);
    const dispatch = useDispatch();
    const classes = eliminationSidebarStyles();
    const { t } = useTranslation();
    
    // debugger
    const { player1Id, player2Id } = props.gameKey && game ? game : props;
    const player1Name: string = props.normalizedPlayers && player1Id ?
        (typeof player1Id === 'number' ?
            props.normalizedPlayers[player1Id]?.name :
            `${props.normalizedPlayers[player1Id[0]].name} / ${props.normalizedPlayers[player1Id[1]].name}`) :
        '';
    const player2Name: string = props.normalizedPlayers && player2Id ?
        (typeof player2Id === 'number' ?
            props.normalizedPlayers[player2Id]?.name :
            `${props.normalizedPlayers[player2Id[0]].name} / ${props.normalizedPlayers[player2Id[1]].name}`) :
        '';

    const isBye = !player1Name || !player2Name;
    useEffect(() => {
        props.gameKey && setGame(gamesState[props.gameKey]);
    }, [props.gameKey && gamesState[props.gameKey]])

    let winner = null;
    if (game && game.score1 !== undefined && game.score2 !== undefined && game.score1 > game.score2) {
        winner = player1Name;
    }
    if (game && game.score1 !== undefined && game.score2 !== undefined && game.score1 < game.score2) {
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
            <div>
                {player1Name}
            </div>
            <div>
                {player2Name}
            </div>
        </div>
    )
}

export default EliminationBracketCard
