import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { EliminationPlayers, StateGame, StatePlayer } from '../../types/entities';
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
    const [game, setGame] = useState<StateGame>();
    const [scoreDialogOpen, setScoreDialogOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const classes = tournamentStyles();
    const { t } = useTranslation();

    useEffect(() => {
        props.gameKey && setGame(gamesState[props.gameKey]);
    }, [props.gameKey && gamesState[props.gameKey]])

    const { player1, player2 } = props.gameKey && game ? game : props;
    let winner = null;
    if (game && game.score1 !== undefined && game.score2 !== undefined && game.score1 > game.score2) {
        winner = player1;
    }
    if (game && game.score1 !== undefined && game.score2 !== undefined && game.score1 < game.score2) {
        winner = player2;
    }

    const handleScoreInput = (score1: number, score2: number) => {
        if (!props.gameKey || !player1 || !player2) return;
        const round = splitGameKey(props.gameKey).round;
        const gameNumber = splitGameKey(props.gameKey).gameNumber;
        const isGameOdd = gameNumber % 2 === 1;
        const winner = score1 > score2 ? player1 : player2;
        const nextGameKey = `${round + 1}-${isGameOdd ? (gameNumber + 1) / 2 : gameNumber / 2}`;

        dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2 } }));
        isGameOdd ?
            dispatch(updateGames({ [nextGameKey]: { ...gamesState[nextGameKey], player1: winner } })) :
            dispatch(updateGames({ [nextGameKey]: { ...gamesState[nextGameKey], player2: winner } }));
        handleScoreDialogClose()
    }

    const handleScoreDialogOpen = () => {
        setScoreDialogOpen(true);
    }

    const handleScoreDialogClose = () => {
        setScoreDialogOpen(false);
    }



    return (!player1 || !player2) ?
        (
            <div className={classes.gameCardBye}>
                {!player1 && player2 && <div>{player2}</div>}
                {!player2 && player1 && <div>{player1}</div>}
            </div>
        ) :
        (
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
                                <div>{game!.score1}</div>
                                <div>{game!.score2}</div>
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
                <EnterScoreDialog
                    open={scoreDialogOpen}
                    onClose={handleScoreDialogClose}
                    onConfirm={handleScoreInput}
                    player1={player1}
                    player2={player2}
                />
            </div>
        )
}

export default EliminationCard
