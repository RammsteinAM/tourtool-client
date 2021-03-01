import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { EliminationPlayers, StateEliminationGame, StatePlayer, StateScore } from '../../types/entities';
import tournamentStyles from './tournamentStyles';
import EliminationSidebar from '../../components/Tournament/EliminationSidebar';
import { updateGames } from '../../redux/tournamentEntities/actions';
import { Nullable } from '../../types/main';
import EnterScoreDialog from '../../components/Tournament/EnterScoreDialog';
import { splitGameKey } from '../../utils/stringUtils';
import { getMultipleSetScores } from '../../utils/scoreUtils';

interface Props {
    player1?: string | [string, string];
    player2?: string | [string, string];
    active?: boolean;
    gameKey?: string;
}

const EliminationCard = (props: Props) => {
    const gamesState = useSelector((state: RootState) => state.entities.eliminationGames);
    const tournamentState = useSelector((state: RootState) => state.entities.tournament);
    const [game, setGame] = useState<StateEliminationGame>();
    const [scoreDialogOpen, setScoreDialogOpen] = useState<boolean>(false);
    const { player1: player1Name, player2: player2Name } = props.gameKey && game ? game : props;
    const dispatch = useDispatch();
    const classes = tournamentStyles();
    const { t } = useTranslation();
    const isBye = props.active ? !!game?.hasByePlayer : (!player1Name || !player2Name)

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

    const handleScoreInput = (scores1: StateScore, scores2: StateScore) => {
        if (!props.gameKey || !player1Name || !player2Name) return;
        const finalRoundNumber = Object.keys(gamesState).map(key => splitGameKey(key).round).sort(function (a, b) { return b - a })[0] + 1;
        const { score1, score2 } = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length)
        const round = splitGameKey(props.gameKey).round;
        const gameNumber = splitGameKey(props.gameKey).gameNumber;
        const isGameOdd = gameNumber % 2 === 1;
        const winner = score1 > score2 ? player1Name : player2Name;
        const nextGameKey = `${round + 1}-${isGameOdd ? (gameNumber + 1) / 2 : gameNumber / 2}`;

        dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) } }));
        if (round < finalRoundNumber - 1) {
            isGameOdd ?
                dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) }, [nextGameKey]: { ...gamesState[nextGameKey], player1: winner } })) :
                dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) }, [nextGameKey]: { ...gamesState[nextGameKey], player2: winner } }));
        }
        if (round === finalRoundNumber - 1) {
            isGameOdd ?
                dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) }, ['final']: { ...gamesState['final'], player1: winner } })) :
                dispatch(updateGames({ [props.gameKey]: { ...gamesState[props.gameKey], score1, score2, scores1: Object.values(scores1), scores2: Object.values(scores2) }, ['final']: { ...gamesState['final'], player2: winner } }));
            if (tournamentState.thirdPlace) {
                const loser = score1 > score2 ? player2Name : player1Name;
                isGameOdd ?
                    dispatch(updateGames({ ['thirdPlace']: { ...gamesState['thirdPlace'], player1: loser } })) :
                    dispatch(updateGames({ ['thirdPlace']: { ...gamesState['thirdPlace'], player2: loser } }));
            }
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
                {!player1Name && player2Name && <div>{player2Name}</div>}
                {!player2Name && player1Name && <div>{player1Name}</div>}
            </div>
        );
    }

    return (
        <div className={classes.gameCard}>
            <div className={props.active && winner === player2Name ? classes.loser : undefined}>
                {player1Name}
            </div>
            <div className={props.active && winner === player1Name ? classes.loser : undefined}>
                {player2Name}
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
                    {player1Name && player2Name &&
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
                    player1={player1Name}
                    player2={player2Name}
                    gameKey={props.gameKey}
                />}
        </div>
    )
}

export default EliminationCard
