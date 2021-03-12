import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { Games, StateLMSPlayers } from '../../types/entities';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { resetGames, updateGames } from '../../redux/tournamentEntities/actions';
import { debounce, differenceBy, shuffle } from 'lodash';
import { useResizeDetector } from 'react-resize-detector';
import GameListRound from '../../components/Tournament/GameListRound';
import LastManStandingPlayerStatsList from './LastManStandingPlayerStatsList';
import lastManStandingStyles from './lastManStandingStyles';

export interface Players {
    [key: string]: {
        name: string;
        lives: number;
        numberOfGames: number;
        points: number;
        goals: number;
        goalsIn: number;
    };
}
interface Props {
}

const LastManStanding = (props: Props) => {
    const [rounds, setRounds] = useState<number>(1);
    const [playerData, setPlayerData] = useState<Players>({});
    const [maxScores, setMaxScores] = useState<number>(7);
    const { width, height, ref: resizeRef } = useResizeDetector();
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const storeGames = useSelector((state: RootState) => state.entities.games);
    const lmsPlayers = useSelector((state: RootState) => state.entities.lmsPlayers);
    const dispatch = useDispatch();
    const classes = lastManStandingStyles();
    const { t } = useTranslation();

    useEffect(() => {
        submitInitialGamesToStore();
    }, [])

    useEffect(() => {
        const playerData = getPlayersDataWithStats();
        setPlayerData(playerData);
    }, [storeGames, entityState.tournament])

    useEffect(() => {
        width && delayedUpdateMaxScores(width);
    }, [width])

    const delayedUpdateMaxScores = useCallback(debounce(score => updateMaxScores(score), 300), [maxScores])

    const updateMaxScores = (width: number) => {
        const score = Math.round((width - 391) / 71);
        if (score < 3) {
            setMaxScores(2);
            return;
        }
        score > 0 && setMaxScores(score);
    }

    const getPlayersDataWithStats = () => {
        const gamesArr = Object.values(storeGames);

        const { numberOfLives, pointsForWin, pointsForDraw } = entityState.tournament;

        const players: Players = {};

        if (typeof numberOfLives !== 'number' || typeof pointsForWin !== 'number' || typeof pointsForDraw !== 'number') return players;
        debugger
        lmsPlayers.forEach(player => {
            if (typeof player.name === 'string') {
                players[player.name] = {
                    name: player.name,
                    lives: numberOfLives,
                    numberOfGames: 0,
                    points: 0,
                    goals: 0,
                    goalsIn: 0,
                }
            }
            // DYP
            else if (player.name[0] && player.name[1]) {
                players[player.name[0]] = {
                    name: player.name[0],
                    lives: numberOfLives,
                    numberOfGames: 0,
                    points: 0,
                    goals: 0,
                    goalsIn: 0,
                }
                players[player.name[1]] = {
                    name: player.name[1],
                    lives: numberOfLives,
                    numberOfGames: 0,
                    points: 0,
                    goals: 0,
                    goalsIn: 0,
                }
            }
        })
        const playersData = gamesArr.reduce(function (acc, val, i) {
            if (!val.score1 || !val.score2) {
                return acc;
            }

            // SINGLE, TEAM
            if (typeof val.player1 === 'string' && typeof val.player2 === 'string') {

                acc[val.player1].numberOfGames++;
                acc[val.player2].numberOfGames++;

                acc[val.player1].goals += val.score1;
                acc[val.player2].goals += val.score2;

                acc[val.player1].goalsIn += val.score2;
                acc[val.player2].goalsIn += val.score1;

                if (val.score1 > val.score2) {
                    acc[val.player1].points += pointsForWin;
                    acc[val.player2].lives--;
                }
                if (val.score1 < val.score2) {                    
                    acc[val.player1].points += pointsForWin;
                    acc[val.player1].lives--;
                }
                if (val.score1 === val.score2) {
                    acc[val.player1].points += pointsForDraw;
                    acc[val.player2].points += pointsForDraw;
                }

            }

            // DYP
            else if (val.player1[0] && val.player1[1] && val.player2[0] && val.player2[1]) {

                acc[val.player1[0]].numberOfGames++;
                acc[val.player1[1]].numberOfGames++;
                acc[val.player2[0]].numberOfGames++;
                acc[val.player2[1]].numberOfGames++;

                acc[val.player1[0]].goals += val.score1;
                acc[val.player1[1]].goals += val.score1;
                acc[val.player2[0]].goals += val.score2;
                acc[val.player2[1]].goals += val.score2;

                acc[val.player1[0]].goalsIn += val.score2;
                acc[val.player1[1]].goalsIn += val.score2;
                acc[val.player2[0]].goalsIn += val.score1;
                acc[val.player2[1]].goalsIn += val.score1;

                if (val.score1 > val.score2) {                    
                    acc[val.player1[0]].points += pointsForWin;
                    acc[val.player1[1]].points += pointsForWin;
                    acc[val.player2[0]].lives--;
                    acc[val.player2[1]].lives--;
                }
                if (val.score1 < val.score2) {
                    acc[val.player2[0]].points += pointsForWin;
                    acc[val.player2[0]].points += pointsForWin;
                    acc[val.player1[0]].lives--;
                    acc[val.player1[1]].lives--;
                }
                if (val.score1 === val.score2) {
                    acc[val.player1[0]].points += pointsForDraw;
                    acc[val.player1[1]].points += pointsForDraw;
                    acc[val.player2[0]].points += pointsForDraw;
                    acc[val.player2[1]].points += pointsForDraw;
                }
            }

            return acc;
        }, players);

        return playersData;
    };

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

    const alivePlayerCount = Object.values(playerData).reduce((acc, val) => {
        if (val.lives > 0) {
            return acc + 1;
        }
        return acc;
    }, 0);

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

        debugger
        dispatch(resetGames());
        dispatch(updateGames(storeGames));
    }

    const submitNewRoundGamesToStore = (nextRound: number, currentRound: number) => {
        const players = entityState.lmsPlayers;
        const games = entityState.games;
        const lastRoundPlayers: StateLMSPlayers = []
        let nextRoundPlayers: StateLMSPlayers = [];
        const numberOfGames = Math.floor(players.length / 2);

        for (let i = 1; i <= numberOfGames; i++) {
            lastRoundPlayers.push({ name: games[`${currentRound}-${i}`].player1 });
            lastRoundPlayers.push({ name: games[`${currentRound}-${i}`].player2 });
        }

        const waitingPlayer = differenceBy(players, lastRoundPlayers, 'name');
        const shuffledLastRoundPlayers = shuffle(lastRoundPlayers);
        if (waitingPlayer.length > 0) {
            shuffledLastRoundPlayers.pop();
            shuffledLastRoundPlayers.push(waitingPlayer[0])
        }

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
                style={{ width: `calc(100% - ${settingsState.tournamentSidebar ? 362 : 0}px)`, marginRight: settingsState.tournamentSidebar ? '12px' : '0px' }}
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
                    {validateRoundComplete() && alivePlayerCount > 1 &&
                        <Button onClick={handleNewRound} color="default" size='small' type='button' className={classes.dialogButton}>
                            {t('New Round')}
                        </Button>
                    }
                </CardActions>
            </Card>
            {settingsState.tournamentSidebar && <div className={classes.tournamentGameSidebar}>
                <Card className={classes.cardRootSideTop}>
                    <LastManStandingPlayerStatsList playersData={playerData} />
                </Card>
                <Card className={classes.cardRootSideBottom}>
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
