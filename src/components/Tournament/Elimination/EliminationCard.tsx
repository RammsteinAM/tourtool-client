import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import { FetchedGameData, FetchedPlayer, GameUpdateReqData, StateEliminationGame, StateScore } from '../../../types/entities';
import { entityActions, updateEliminationGames } from '../../../redux/tournamentEntities/actions';
import EnterScoreDialog from '../EnterScore/EnterScoreDialog';
import { getNextGameKey, splitGameKey } from '../../../utils/stringUtils';
import { getMultipleSetScores } from '../../../utils/scoreUtils';
import eliminationSidebarStyles from './eliminationSidebarStyles';
import { gameActions } from '../../../redux/games/actions';

interface Props {
    games: { [index: string]: FetchedGameData };
    game: FetchedGameData;
    player1Id?: number | [number, number];
    player2Id?: number | [number, number];
    normalizedPlayers?: { [id: number]: FetchedPlayer }
    gameKey: string;
}

const EliminationCard = (props: Props) => {
    // const [game, setGame] = useState<StateEliminationGame>();
    const [scoreDialogOpen, setScoreDialogOpen] = useState<boolean>(false);
    const [scores, setScores] = useState<{ 1: number, 2: number }>();

    // const [winner, setWinner] = useState<string>();

    // const [score2, setScore2] = useState<number>();
    const gamesState = useSelector((state: RootState) => state.entities.eliminationGames);
    const tournamentState = useSelector((state: RootState) => state.entities.tournament);
    const dispatch = useDispatch();
    const classes = eliminationSidebarStyles();
    const { t } = useTranslation();

    useEffect(() => {
        let score1, score2;
        // const { score1, score2 } = (game.scores1 && game.scores2) && getMultipleSetScores(game.scores1, game.scores2, Object.keys(game.scores1).length);
        if (game.scores1 && game.scores2) {
            score1 = getMultipleSetScores(game.scores1, game.scores2, Object.keys(game.scores1).length).score1;
            score2 = getMultipleSetScores(game.scores1, game.scores2, Object.keys(game.scores1).length).score2;
        }
        if (typeof score1 === 'number' && typeof score2 === 'number') {
            setScores({1: score1, 2: score2})
        }
        // let winner = null;
        // if (score1 !== undefined && score2 !== undefined && score1 > score2) {
        //     setWinner(player1Name);
        // }
        // if (score1 !== undefined && score2 !== undefined && score1 < score2) {
        //     setWinner(player2Name);
        // }
    
    }, [props.game.scores1, props.game.scores2])

    // debugger
    // const { player1Id, player2Id } = props.gameKey && game ? game : props;
    const game = props.game//s[props.gameKey];
    const player1 = game.player1;
    const player2 = game.player2;
    let player1Name = '';
    let player2Name = '';

    switch (player1?.length) {
        case 1:
            player1Name = props.normalizedPlayers ? props.normalizedPlayers[player1[0].id]?.name : ''
            break;
        case 2:
            player1Name = props.normalizedPlayers ? `${props.normalizedPlayers[player1[0].id]?.name} / ${props.normalizedPlayers[player1[1].id]?.name}` : ''
            break;
    }
    switch (player2?.length) {
        case 1:
            player2Name = props.normalizedPlayers ? props.normalizedPlayers[player2[0].id]?.name : ''
            break;
        case 2:
            player2Name = props.normalizedPlayers ? `${props.normalizedPlayers[player2[0].id]?.name} / ${props.normalizedPlayers[player2[1].id]?.name}` : ''
            break;
    }

    const isBye = props.games[props.gameKey]?.hasByePlayer;

    let score1, score2;
    // const { score1, score2 } = (game.scores1 && game.scores2) && getMultipleSetScores(game.scores1, game.scores2, Object.keys(game.scores1).length);
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

    const handleScoreInput = (scores1: StateScore, scores2: StateScore) => {
        if (!props.gameKey/*  || !player1Id || !player2Id */) return;
        const finalRoundNumber = Object.values(props.games).map(game => splitGameKey(game.index).round).sort(function (a, b) { return b - a })[0];
        const { score1, score2 } = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length);

        const gameData: GameUpdateReqData = {
            id: props.games[props.gameKey].id,
            scores1: Object.values(scores1),
            scores2: Object.values(scores2),
        }

        dispatch(gameActions.editGame(gameData));

        const winner = score1 > score2 ? player1 : player2;
        const loser = score1 > score2 ? player2 : player1;

        const round = splitGameKey(props.gameKey).round;
        const gameNumber = splitGameKey(props.gameKey).gameNumber;
        if (isNaN(round)) {
            handleScoreDialogClose()
            return;
        }
        const isGameOdd = gameNumber % 2 === 1;

        const nextGameKey = getNextGameKey(props.gameKey, finalRoundNumber);

        const getParentsData = (gameKey: string) => {
            const round = splitGameKey(gameKey).round;
            const gameNumber = splitGameKey(gameKey).gameNumber;
            const parent1GameKey = `${round - 1}-${gameNumber * 2 - 1}`;
            const parent2GameKey = `${round - 1}-${gameNumber * 2}`;
            const data = {
                p1p1: props.games[parent1GameKey]?.player1,
                p1p2: props.games[parent1GameKey]?.player2,
                parent1HasByePlayer: props.games[parent1GameKey]?.hasByePlayer,
                parent1HasNoPlayer: !props.games[parent1GameKey]?.player1 && !props.games[parent1GameKey]?.player2,
                p2p1: props.games[parent2GameKey]?.player1,
                p2p2: props.games[parent2GameKey]?.player2,
                parent2HasByePlayer: props.games[parent2GameKey]?.hasByePlayer,
                parent2HasNoPlayer: !props.games[parent2GameKey]?.player1 && !props.games[parent2GameKey]?.player2,
                numberOfParentPlayers: Number(!!props.games[parent1GameKey]?.player1) + Number(!!props.games[parent1GameKey]?.player2) + Number(!!props.games[parent2GameKey]?.player1) + Number(!!props.games[parent2GameKey]?.player2),
            };
            return data;
        }

        function updateNextGame(nextGameKey: string, isGameOdd: boolean) {
            const nextGameParentData = getParentsData(nextGameKey);
            const nextOfNextGameKey = getNextGameKey(nextGameKey, finalRoundNumber);
            const gameNumber = splitGameKey(nextGameKey).gameNumber;
            const isNextGameOdd = !isNaN(gameNumber) ? gameNumber % 2 === 1 : true;
            const hasByePlayer = (nextGameParentData.parent1HasNoPlayer) || (nextGameParentData.parent2HasNoPlayer);
            const nextGame = props.games[nextGameKey];
            if (isGameOdd) {
                const gameData: GameUpdateReqData = {
                    id: nextGame.id,
                    player1: winner,
                    hasByePlayer
                }
                dispatch(gameActions.editGame(gameData));

                if (round === finalRoundNumber - 1 && props.games['thirdPlace']) {
                    const thirdPlaceGameData: GameUpdateReqData = {
                        id: props.games['thirdPlace'].id,
                        player1: loser ? [...loser] : undefined,
                        hasByePlayer: nextGameParentData.numberOfParentPlayers < 4
                    }
                    dispatch(gameActions.editGame(thirdPlaceGameData));
                }
            }
            else {
                const gameData: GameUpdateReqData = {
                    id: nextGame.id,
                    player2: winner,
                    hasByePlayer
                }
                dispatch(gameActions.editGame(gameData));

                if (round === finalRoundNumber - 1 && props.games['thirdPlace']) {
                    const thirdPlaceGameData: GameUpdateReqData = {
                        id: props.games['thirdPlace'].id,
                        player2: loser ? [...loser] : undefined,
                        hasByePlayer: nextGameParentData.numberOfParentPlayers < 4
                    }
                    dispatch(gameActions.editGame(thirdPlaceGameData));
                }
            }
            if (nextOfNextGameKey && (hasByePlayer || (nextGame.scores1 && nextGame.scores2 && nextGame.scores1?.length > 0 && nextGame.scores2?.length > 0))) {
                updateNextGame(nextOfNextGameKey, isNextGameOdd);
            }
        }

        nextGameKey && updateNextGame(nextGameKey, isGameOdd);

        handleScoreDialogClose();
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
            {player1Name && player2Name &&
                <div className={classes.gameCardEnterResult} onClick={handleScoreDialogOpen}>
                    <div className={classes.gameCardEnterResultBtn}>{t('Enter Result')}</div>
                </div>
            }
            <EnterScoreDialog
                open={scoreDialogOpen}
                onClose={handleScoreDialogClose}
                onConfirm={handleScoreInput}
                player1={player1Name}
                player2={player2Name}
                gameKey={props.gameKey}
                game={props.games[props.gameKey]}
                visibleScores={tournamentState.numberOfGoals && tournamentState.numberOfGoals < 9 ? tournamentState.numberOfGoals + 1 : 9}
            />
        </div>
    )
}

export default EliminationCard
