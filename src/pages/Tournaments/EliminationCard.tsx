import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { EliminationPlayers, StateGame, StatePlayer, StateScore } from '../../types/entities';
import tournamentStyles from './tournamentStyles';
import EliminationSidebar from '../../components/Tournament/EliminationSidebar';
import { updateGames, updatePlayers } from '../../redux/tournamentEntities/actions';
import { Nullable } from '../../types/main';
import EnterScoreDialog from '../../components/Tournament/EnterScoreDialog';
import { splitGameKey } from '../../utils/stringUtils';

interface Props {
    player1?: string;
    player2?: string;
    active?: boolean;
    gameKey?: string;
}

const EliminationCard = (props: Props) => {
    const gamesState = useSelector((state: RootState) => state.entities.games);
    const tournamentState = useSelector((state: RootState) => state.entities.tournament);
    const [game, setGame] = useState<StateGame>();
    const [scoreDialogOpen, setScoreDialogOpen] = useState<boolean>(false);
    const { player1, player2 } = props.gameKey && game ? game : props;
    const dispatch = useDispatch();
    const classes = tournamentStyles();
    const { t } = useTranslation();
    const isBye = props.active ? !!game?.hasByePlayer : (!player1 || !player2)

    useEffect(() => {
        props.gameKey && setGame(gamesState[props.gameKey]);
    }, [props.gameKey && gamesState[props.gameKey]])

    let winner = null;
    if (game && game.score1 !== undefined && game.score2 !== undefined && game.score1 > game.score2) {
        winner = player1;
    }
    if (game && game.score1 !== undefined && game.score2 !== undefined && game.score1 < game.score2) {
        winner = player2;
    }

    const handleScoreInput = (scores1: StateScore, scores2: StateScore) => {
        if (!props.gameKey || !player1 || !player2) return;
        const finalRoundNumber = Object.keys(gamesState).map(key => splitGameKey(key).round).sort(function (a, b) { return b - a })[0];
        let score1 = scores1[1], score2 = scores2[1];
        if (Object.keys(scores1).length > 1 && Object.keys(scores1).length === Object.keys(scores2).length) {
            score1 = 0;
            score2 = 0;
            for (let i = 1; i <= Object.keys(scores1).length; i++) {
                const subScore1 = scores1[i];
                const subScore2 = scores2[i];
                score1 = score1 + Number(subScore1 > subScore2)
                score2 = score2 + Number(subScore2 > subScore1)
            }
        }
        debugger
        const round = splitGameKey(props.gameKey).round;
        const gameNumber = splitGameKey(props.gameKey).gameNumber;
        const isGameOdd = gameNumber % 2 === 1;
        const winner = score1 > score2 ? player1 : player2;
        const nextGameKey = `${round + 1}-${isGameOdd ? (gameNumber + 1) / 2 : gameNumber / 2}`;

        dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2 } }));
        if (round < finalRoundNumber) {
            isGameOdd ?
                dispatch(updateGames({ [nextGameKey]: { ...gamesState[nextGameKey], player1: winner } })) :
                dispatch(updateGames({ [nextGameKey]: { ...gamesState[nextGameKey], player2: winner } }));
        }

        if (round === finalRoundNumber - 1 && tournamentState.thirdPlace) {
            const loser = score1 > score2 ? player2 : player1;
            isGameOdd ?
                dispatch(updateGames({ ['thirdPlace']: { ...gamesState['thirdPlace'], player1: loser } })) :
                dispatch(updateGames({ ['thirdPlace']: { ...gamesState['thirdPlace'], player2: loser } }));
        }
        handleScoreDialogClose()
    }

    const handleScoreDialogOpen = () => {
        setScoreDialogOpen(true);
    }

    const handleScoreDialogClose = () => {
        setScoreDialogOpen(false);
    }
    if (isBye) {
        return (
            <div className={classes.gameCardBye}>
                {!player1 && player2 && <div>{player2}</div>}
                {!player2 && player1 && <div>{player1}</div>}
            </div>
        );
    }

    return (
        <div className={classes.gameCard}>
            <div className={props.active && winner === player2 ? classes.loser : undefined}>
                {player1}
            </div>
            <div className={props.active && winner === player1 ? classes.loser : undefined}>
                {player2}
            </div>
            {props.active &&
                <>
                    {game && game.score1 !== undefined && game.score2 !== undefined ?
                        <div className={classes.gameCardScore}>
                            <div>{game.score1}</div>
                            <div>{game.score2}</div>
                        </div> :
                        <div className={classes.gameCardScore}>{t('vs')}</div>
                    }
                    {player1 && player2 &&
                        <div className={classes.gameCardEnterResult} onClick={handleScoreDialogOpen}>
                            <div className={classes.gameCardEnterResultBtn}>{t('Enter Result')}</div>
                        </div>
                    }
                </>
            }
            {props.gameKey &&
                <EnterScoreDialog
                    open={scoreDialogOpen}
                    onClose={handleScoreDialogClose}
                    onConfirm={handleScoreInput}
                    player1={player1}
                    player2={player2}
                    gameKey={props.gameKey}
                />}
        </div>
    )
}

export default EliminationCard
