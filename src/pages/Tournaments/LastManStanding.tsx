import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { FetchedGameData } from '../../types/entities';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { entityActions } from '../../redux/tournamentEntities/actions';
import { useResizeDetector } from 'react-resize-detector';
import GameListRound from '../../components/Tournament/GameListRound';
import LastManStandingPlayerStatsList from '../../components/Tournament/TournamentStats/LastManStandingPlayerStatsList';
import { getNormalizedParticipants, multiDimensionalUnique } from '../../utils/arrayUtils';
import lastManStandingStyles from './lastManStandingStyles';
import { splitGameKey } from '../../utils/stringUtils';
import { useParams } from 'react-router-dom';
import { gameActions } from '../../redux/games/actions';
import { getMultipleSetScores } from '../../utils/scoreUtils';

export interface Players {
    [key: string]: {
        id: number | [number, number];
        lives: number;
        numberOfGames: number;
        points: number;
        goals: number;
        goalsIn: number;
        matchesWon: number;
        matchesLost: number;
    };
}
interface Props {
}

const LastManStanding = (props: Props) => {
    const [playerData, setPlayerData] = useState<Players>({});
    const [maxScores, setMaxScores] = useState<number>(7);
    const { width, ref: resizeRef } = useResizeDetector({ handleWidth: true, handleHeight: false, refreshMode: 'debounce', refreshRate: 300 });
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const dispatch = useDispatch();
    const classes = lastManStandingStyles();
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10);
    const fetchedTournamentData = entityState.fetchedTournaments.data[tournamentId]
    const tournamentGames = fetchedGames[tournamentId];
    const tournamentPlayerIds = fetchedTournamentData?.players;
    const fetchedPlayers = entityState.fetchedPlayers.data;
    const { t } = useTranslation();

    const isDYP = tournamentGames?.find(game => game.index === '1-1')?.player1?.length === 2;

    const normalizedPlayers = getNormalizedParticipants(fetchedPlayers);

    const tournamentGameRounds = tournamentGames && [...new Set(tournamentGames.map(game => splitGameKey(game.index).round))]

    useEffect(() => {
        if (!fetchedTournamentData?.players) {
            dispatch(entityActions.getTournament(tournamentId));
        }
        if (!fetchedPlayers || fetchedPlayers.length === 0) {
            dispatch(entityActions.getPlayers());
        }
    }, [])

    useEffect(() => {
        const playerData = fetchedTournamentData && tournamentGames && getPlayersDataWithStats();
        setPlayerData(playerData);
    }, [tournamentGames, fetchedTournamentData, fetchedPlayers])

    useEffect(() => {
        width && updateMaxScoresWithCallback(width);
    })

    const updateMaxScoresWithCallback = useCallback(score => updateMaxScores(score), [])

    const updateMaxScores = (width: number) => {
        const score = Math.round((width - 391) / 71);
        if (score < 3) {
            setMaxScores(2);
            return;
        }
        score > 0 && setMaxScores(score);
    }

    const getPlayersDataWithStats = (): Players => {
        const numberOfLives = fetchedTournamentData?.numberOfLives;
        const pointsForWin = fetchedTournamentData?.pointsForWin;
        const pointsForDraw = fetchedTournamentData?.pointsForDraw;
        const tournamentPlayers = fetchedPlayers.filter(p => tournamentPlayerIds && tournamentPlayerIds?.indexOf(p.id) >= 0)
        if (typeof numberOfLives !== 'number' || typeof pointsForWin !== 'number' || typeof pointsForDraw !== 'number') return {};

        const pairs = isDYP ? multiDimensionalUnique(tournamentGames.reduce((acc: [number, number][], val: FetchedGameData) => {
            if (!val.index || !val.player1 || !val.player2) {
                return acc;
            }
            acc.push([val.player1[0].id, val.player1[1].id], [val.player2[0].id, val.player2[1].id])
            return acc;
        }, [])) : null;

        let players: Players = {}

        if (!isDYP) {
            players = tournamentPlayers.reduce((acc: Players, val) => {
                acc[val.id] = {
                    id: val.id,
                    lives: numberOfLives,
                    numberOfGames: 0,
                    points: 0,
                    goals: 0,
                    goalsIn: 0,
                    matchesWon: 0,
                    matchesLost: 0,
                }
                return acc;
            }, {});
        }
        else if (pairs) {
            players = pairs.reduce((acc: Players, val) => {
                const pName = `${normalizedPlayers[val[0]].name} / ${normalizedPlayers[val[1]].name}`;
                acc[pName] = {
                    id: [val[0], val[1]],
                    lives: numberOfLives,
                    numberOfGames: 0,
                    points: 0,
                    goals: 0,
                    goalsIn: 0,
                    matchesWon: 0,
                    matchesLost: 0,
                }
                return acc;
            }, {});
        }

        const playersData = tournamentGames?.reduce((acc, val, i) => {
            if (!val.scores1 || !val.scores2 || val.scores1.length === 0 || val.scores2.length === 0 || !normalizedPlayers) {
                return acc;
            }
            const { score1, score2 } = getMultipleSetScores(val.scores1, val.scores2, val.scores1.length);
            const scores1Sum = val.scores1.reduce((acc, val) => acc + val);
            const scores2Sum = val.scores2.reduce((acc, val) => acc + val);

            if (!val.player1 || !val.player2) {
                return acc;
            }

            const id1_0 = val.player1[0] && val.player1[0].id;
            const id1_1 = val.player1[1] && val.player1[1].id;
            const id2_0 = val.player2[0] && val.player2[0].id;
            const id2_1 = val.player2[1] && val.player2[1].id;

            // SINGLE, TEAM
            if (id1_0 && id2_0 && acc[id1_0] && acc[id2_0] && !id1_1 && !id2_1) {

                acc[id1_0].numberOfGames++;
                acc[id2_0].numberOfGames++;

                acc[id1_0].goals += scores1Sum;
                acc[id2_0].goals += scores2Sum;

                acc[id1_0].goalsIn += scores2Sum;
                acc[id2_0].goalsIn += scores1Sum;

                if (score1 > score2) {
                    acc[id1_0].points += pointsForWin;
                    acc[id1_0].matchesWon += 1;
                    acc[id2_0].matchesLost += 1;
                    acc[id2_0].lives--;
                }
                if (score1 < score2) {
                    acc[id1_0].points += pointsForWin;
                    acc[id1_0].matchesLost += 1;
                    acc[id2_0].matchesWon += 1;
                    acc[id1_0].lives--;
                }
                if (score1 === score2) {
                    acc[id1_0].points += pointsForDraw;
                    acc[id2_0].points += pointsForDraw;
                }
            }
            // DYP
            else if (id1_0 && id2_0 && id1_1 && id2_1) {
                const participant1Name = `${normalizedPlayers[id1_0].name} / ${normalizedPlayers[id1_1].name}`;
                const participant2Name = `${normalizedPlayers[id2_0].name} / ${normalizedPlayers[id2_1].name}`;
                if (!acc[participant1Name] || !acc[participant2Name]) {
                    return acc
                }

                acc[participant1Name].numberOfGames++;
                acc[participant2Name].numberOfGames++;

                acc[participant1Name].goals += scores1Sum;
                acc[participant2Name].goals += scores2Sum;

                acc[participant1Name].goalsIn += scores2Sum;
                acc[participant2Name].goalsIn += scores1Sum;

                if (score1 > score2) {
                    acc[participant1Name].points += pointsForWin;
                    acc[participant1Name].matchesWon += 1;
                    acc[participant2Name].matchesLost += 1;
                    acc[participant2Name].lives--;
                }
                if (score1 < score2) {
                    acc[participant2Name].points += pointsForWin;
                    acc[participant2Name].matchesWon += 1;
                    acc[participant1Name].matchesLost += 1;
                    acc[participant1Name].lives--;
                }
                if (score1 === score2) {
                    acc[participant1Name].points += pointsForDraw;
                    acc[participant2Name].points += pointsForDraw;
                }
            }

            return acc;
        }, players);

        return playersData;
    };

    const handleShowResult = () => {

    }

    const validateRoundComplete = () => {
        const games = tournamentGames;
        for (const key in games) {
            if (Object.prototype.hasOwnProperty.call(games, key)) {
                const game = games[key];
                if (!game.scores1 || !game.scores2 || game.scores1.length === 0 || game.scores2.length === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const alivePlayerCount = playerData && Object.values(playerData).reduce((acc, val) => {
        if (val.lives > 0) {
            ++acc;
        }
        return acc;
    }, 0);

    const handleNewRound = () => {
        dispatch(gameActions.createNextLMSRound(tournamentId));
    }


    if (!fetchedTournamentData) {
        return null;
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
                <CardContent className={classes.cardContent}>
                    {tournamentGameRounds?.sort().map(round => {
                        return (
                            <GameListRound
                                key={`gameListRound_${round}`}
                                tournamentId={tournamentId}
                                roundNubmer={round}
                                maxScores={maxScores}
                                normalizedPlayers={normalizedPlayers}
                            />
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
                    <LastManStandingPlayerStatsList playerData={playerData} />
                </Card>
                {/* <Card className={classes.cardRootSideBottom}>
                    <CardContent className={classes.cardContent}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, dolorem quos cumque dolores ducimus
                    </CardContent>
                </Card> */}
            </div>
            }
        </div>
    )
}

export default LastManStanding
