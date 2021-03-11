import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { Games, StateLMSPlayer, StateLMSPlayers } from '../../types/entities';
import { splitGameKey } from '../../utils/stringUtils';
import EliminationCard from './EliminationCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { CardHeader } from '@material-ui/core';
import { resetGames, updateGames } from '../../redux/tournamentEntities/actions';
import GameListRow from '../../components/Tournament/GameListRow';
import { debounce, differenceBy, shuffle } from 'lodash';
import { useResizeDetector } from 'react-resize-detector';
import GameListRound from '../../components/Tournament/GameListRound';
import LastManStandingPlayerStatsList from './LastManStandingPlayerStatsList';
import LastManStandingPlayerStatsRow from './LastManStandingPlayerStatsRow';
import lastManStandingStyles from './lastManStandingStyles';

interface Player {
    [key: string]: {
        name: string;
        lives: number;
        numberOfGames: number;
        points: number;
        goals: number;
        goalsIn: number;
        // goalDiff: number;
    };
}
interface Props {
}

const LastManStanding = (props: Props) => {
    const [games, setGames] = useState<Games>({});
    const [rounds, setRounds] = useState<number>(1);
    const [maxScores, setMaxScores] = useState<number>(7);
    const { width, height, ref: resizeRef } = useResizeDetector();
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const storeGames = useSelector((state: RootState) => state.entities.games);
    const lmsPlayers = useSelector((state: RootState) => state.entities.lmsPlayers);
    const statsColOrder = useSelector((state: RootState) => state.settings.tournamentSidebarColumnOrder) || ['name', 'numberOfGames', 'lives'];
    const firstRoundGameNumber = Object.keys(games).filter(gameKey => splitGameKey(gameKey).round === 1).length;
    const dispatch = useDispatch();
    const columns = Math.log(Object.keys(games).length + 1) / Math.log(2);
    const classes = lastManStandingStyles();
    const { t } = useTranslation();

    // useEffect(() => {

    //     setGames({ ...entityState.eliminationGames })

    // }, [/* entityState.players */])

    useEffect(() => {
        submitInitialGamesToStore()
        //setGames({ ...entityState.lmsPlayers })
        // dispatch(updateGames())
    }, [])

    useEffect(() => {
        delayedUpdateMaxScores(width);
    }, [width])

    const delayedUpdateMaxScores = useCallback(debounce(score => updateMaxScores(score), 300), [maxScores])

    const updateMaxScores = (width: number) => {
        const score = Math.round((width - 391) / 71);
        if (score < 3) {
            setMaxScores(2);
            return;
        }
        setMaxScores(score);
    }

    const handleShowResult = () => {

    }

    const validateRoundComplete = () => {
        const games = entityState.games;
        for (const key in games) {
            if (Object.prototype.hasOwnProperty.call(games, key)) {
                const game = games[key];
                if (typeof game.score1 !== 'number' || typeof game.score2 !== 'number') {
                    return false;
                }
            }
        }
        return true;
    }

    // const getLives = () => {
    //     const games = entityState.games;
    //     for (const key in games) {
    //         if (Object.prototype.hasOwnProperty.call(games, key)) {
    //             const game = games[key];
    //             if (typeof game.score1 !== 'number' || typeof game.score2 !== 'number') {
    //                 return false;
    //             }
    //         }
    //     }
    //     return true;
    // }

    const handleNewRound = () => {
        setRounds(rounds + 1);
        submitNewRoundGamesToStore(rounds + 1, rounds);
    }

    const submitInitialGamesToStore = () => {
        const players = entityState.lmsPlayers;
        const storeGames: Games = {};
        let i = 0, j = 1;
        while (players[i] && players[i + 1]) {
            storeGames[`1-${j}`] = { player1: players[i].name, player2: players[i + 1].name }
            i += 2
            j++
        }

        dispatch(resetGames());
        dispatch(updateGames(storeGames));
    }

    const submitNewRoundGamesToStore = (nextRound: number, currentRound: number) => {
        const players = entityState.lmsPlayers;
        const games = entityState.games;
        const lastRoundPlayers: StateLMSPlayers/* (string | [string, string])[] */ = []
        let nextRoundPlayers: StateLMSPlayers = [];
        const numberOfGames = Math.floor(players.length / 2);

        debugger
        for (let i = 1; i <= numberOfGames; i++) {
            lastRoundPlayers.push({ name: games[`${currentRound}-${i}`].player1 });
            lastRoundPlayers.push({ name: games[`${currentRound}-${i}`].player2 });
        }


        const waitingPlayer = differenceBy(players, lastRoundPlayers, 'name');
        const shuffledLastRoundPlayers = shuffle(lastRoundPlayers);
        shuffledLastRoundPlayers.pop();
        waitingPlayer.length > 0 && shuffledLastRoundPlayers.push(waitingPlayer[0])

        nextRoundPlayers = shuffledLastRoundPlayers;

        const storeGames: Games = {};
        let i = 0, j = 1;
        while (players[i] && players[i + 1]) {
            storeGames[`${nextRound}-${j}`] = { player1: nextRoundPlayers[i].name, player2: nextRoundPlayers[i + 1].name }
            i += 2
            j++
        }

        dispatch(updateGames(storeGames));
    }

    return (
        <div className={classes.tournamentGameRoot}>
            <Card
                ref={resizeRef}
                className={classes.cardRoot}
                style={{ width: `calc(100% - ${settingsState.tournamentSidebar ? 350 : 0}px)`, marginRight: settingsState.tournamentSidebar ? '12px' : '0px' }}
            >
                <div className={classes.tournamentGameContainerHeader}>
                </div>
                <CardContent className={classes.cardContent}                >
                    {[...Array(rounds).keys()].map((i) => {
                        return (
                            <GameListRound key={`gameListRound_${i}`} roundNubmer={i + 1} maxScores={maxScores} />
                        )
                    })}
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <Button onClick={handleShowResult} color="default" size='small' type='button' className={classes.dialogButton}>
                        {t('Show Result')}
                    </Button>
                    {validateRoundComplete() &&
                        <Button onClick={handleNewRound} color="default" size='small' type='button' className={classes.dialogButton}>
                            {t('New Round')}
                        </Button>
                    }
                </CardActions>
            </Card>
            {settingsState.tournamentSidebar && <div className={classes.tournamentGameSidebar}>
                <Card className={classes.cardRootSide}>
                    <LastManStandingPlayerStatsList />
                </Card>
                <Card className={classes.cardRootSide}>
                    <CardContent className={classes.cardContent}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, dolorem quos cumque dolores ducimus
                    </CardContent>
                </Card>
            </div>
            }
        </div>
    )
}

export default LastManStanding
