import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import { FetchedPlayer, StateEliminationGame, StateScore } from '../../../types/entities';
import { updateEliminationGames } from '../../../redux/tournamentEntities/actions';
import EnterScoreDialog from '../EnterScore/EnterScoreDialog';
import { getNextGameKey, splitGameKey } from '../../../utils/stringUtils';
import { getMultipleSetScores } from '../../../utils/scoreUtils';
import eliminationSidebarStyles from './eliminationSidebarStyles';
import { Nullable } from '../../../types/main';

interface Props {
    // player1?: string | [string, string];
    // player2?: string | [string, string];
    player1Id?: number | [number, number];
    player2Id?: number | [number, number];
    normalizedPlayers?: { [id: number]: FetchedPlayer }
    active?: boolean;
    gameKey?: string;
}

const EliminationCard = (props: Props) => {
    const [game, setGame] = useState<StateEliminationGame>();
    const [scoreDialogOpen, setScoreDialogOpen] = useState<boolean>(false);
    const gamesState = useSelector((state: RootState) => state.entities.eliminationGames);
    const tournamentState = useSelector((state: RootState) => state.entities.tournament);
    const fetchedPlayers = useSelector((state: RootState) => state.entities.fetchedPlayers.data);
    const dispatch = useDispatch();
    const classes = eliminationSidebarStyles();
    const { t } = useTranslation();

    const { player1Id, player2Id } = props.gameKey && game ? game : props;
    const player1Name: string = props.normalizedPlayers && player1Id ?
        (typeof player1Id === 'number' ?
            props.normalizedPlayers[player1Id].name :
            `${props.normalizedPlayers[player1Id[0]].name} / ${props.normalizedPlayers[player1Id[1]].name}`) :
        '';
    const player2Name: string = props.normalizedPlayers && player2Id ?
        (typeof player2Id === 'number' ?
            props.normalizedPlayers[player2Id].name :
            `${props.normalizedPlayers[player2Id[0]].name} / ${props.normalizedPlayers[player2Id[1]].name}`) :
        '';



    // const player1: FetchedPlayer = props.normalizedPlayers && typeof player1Id === 'number' ? props.normalizedPlayers[player1Id].name : ;
    // const player2: FetchedPlayer = fetchedPlayers.find(p => p.id === player2Id) || { name: '' };
    const isBye = props.active ? !!game?.hasByePlayer : (!player1Name || !player2Name);
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
        if (!props.gameKey || !player1Id || !player2Id) return;
        const finalRoundNumber = Object.keys(gamesState).map(key => splitGameKey(key).round).sort(function (a, b) { return b - a })[0];
        const { score1, score2 } = getMultipleSetScores(scores1, scores2, Object.keys(scores1).length);

        dispatch(updateEliminationGames(
            {
                [props.gameKey]: {
                    ...gamesState[props.gameKey],
                    score1,
                    score2,
                    scores1: Object.values(scores1),
                    scores2: Object.values(scores2)
                }
            }
        ));
        const winnerId = score1 > score2 ? player1Id : player2Id;
        const loserId = score1 > score2 ? player2Id : player1Id;

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
                p1p1: gamesState[parent1GameKey]?.player1Id,
                p1p2: gamesState[parent1GameKey]?.player2Id,
                parent1HasByePlayer: gamesState[parent1GameKey]?.hasByePlayer,
                parent1isPredetermined: gamesState[parent1GameKey]?.isPredetermined,
                parent1HasNoPlayer: !gamesState[parent1GameKey]?.player1Id && !gamesState[parent1GameKey]?.player2Id,
                p2p1: gamesState[parent2GameKey]?.player1Id,
                p2p2: gamesState[parent2GameKey]?.player2Id,
                parent2HasByePlayer: gamesState[parent2GameKey]?.hasByePlayer,
                parent2isPredetermined: gamesState[parent2GameKey]?.isPredetermined,
                parent2HasNoPlayer: !gamesState[parent2GameKey]?.player1Id && !gamesState[parent2GameKey]?.player2Id,
                numberOfParentPlayers: Number(!!gamesState[parent1GameKey]?.player1Id) + Number(!!gamesState[parent1GameKey]?.player2Id) + Number(!!gamesState[parent2GameKey]?.player1Id) + Number(!!gamesState[parent2GameKey]?.player2Id),
            };
            return data;
        }

        function updateNextGames(nextGameKey: Nullable<string>, isGameOdd: boolean) {
            if (!nextGameKey) {
                return;
            }
            const nextGameParentData = getParentsData(nextGameKey);
            const nextOfNextGameKey = getNextGameKey(nextGameKey, finalRoundNumber);
            const gameNumber = splitGameKey(nextGameKey).gameNumber;
            const isNextGameOdd = !isNaN(gameNumber) ? gameNumber % 2 === 1 : true;
            const hasByePlayer = (nextGameParentData.parent1isPredetermined && nextGameParentData.parent1HasNoPlayer) || (nextGameParentData.parent2isPredetermined && nextGameParentData.parent2HasNoPlayer);

            if (isGameOdd) {
                dispatch(updateEliminationGames({ [nextGameKey]: { ...gamesState[nextGameKey], player1Id: winnerId, hasByePlayer } }));
                if (round === finalRoundNumber - 1 && tournamentState.thirdPlace) {
                    dispatch(updateEliminationGames({ ['thirdPlace']: { ...gamesState['thirdPlace'], player1Id: loserId, hasByePlayer: nextGameParentData.numberOfParentPlayers < 4 } }));
                }
            }
            else {
                dispatch(updateEliminationGames({ [nextGameKey]: { ...gamesState[nextGameKey], player2Id: winnerId, hasByePlayer } }));
                if (round === finalRoundNumber - 1 && tournamentState.thirdPlace) {
                    dispatch(updateEliminationGames({ ['thirdPlace']: { ...gamesState['thirdPlace'], player2Id: loserId, hasByePlayer: nextGameParentData.numberOfParentPlayers < 4 } }));
                }
            }
            if (hasByePlayer) {
                updateNextGames(nextOfNextGameKey, isNextGameOdd);
            }
        }

        updateNextGames(nextGameKey, isGameOdd);

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
                    games={gamesState}
                    visibleScores={tournamentState.numberOfGoals && tournamentState.numberOfGoals < 9 ? tournamentState.numberOfGoals + 1 : 9}
                />}
        </div>
    )
}

export default EliminationCard
