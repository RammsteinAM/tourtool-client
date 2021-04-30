import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { FetchedGameData, FetchedPlayers } from '../../types/entities';
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
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import SortIcon from '@material-ui/icons/Sort';
import { splitGameKey } from '../../utils/stringUtils';
import { useParams } from 'react-router-dom';
import KEKWemote from '../../resources/icons/KEKW.png';
import { gameActions } from '../../redux/games/actions';
import { getMultipleSetScores } from '../../utils/scoreUtils';
import SearchField from '../../components/SearchField';
import useKonamiCode from '../../hooks/Konami';
import { updateSettings } from '../../redux/settings/actions';

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
    const [searchValue, setSearchValue] = useState<string>('');
    const KEKW = useKonamiCode()
    const { width, ref: resizeRef } = useResizeDetector({ handleWidth: true, handleHeight: false, refreshMode: 'debounce', refreshRate: 300 });
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const dispatch = useDispatch();
    const classes = lastManStandingStyles();
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10);
    const fetchedTournamentData = entityState.fetchedTournaments.data[tournamentId];
    const tournamentGames = fetchedGames[tournamentId];
    const tournamentPlayerIds = fetchedTournamentData?.players;
    const fetchedPlayers = entityState.fetchedPlayers.data;
    const { t } = useTranslation();

    const isDYP = !fetchedTournamentData?.monsterDYP && tournamentGames?.find(game => game.index === '1-1')?.player1?.length === 2;

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
        const playerData = fetchedTournamentData && tournamentGames && calculatePlayersDataWithStats();
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

    const getPlayersInitialData = (tournamentPlayers: FetchedPlayers): Players => {
        const numberOfLives = fetchedTournamentData?.numberOfLives;
        if (typeof numberOfLives !== 'number') return {};

        const pairs = isDYP ? multiDimensionalUnique(tournamentGames.reduce((acc: [number, number][], val: FetchedGameData) => {
            if (!val.index || !val.player1 || !val.player2) {
                return acc;
            }
            acc.push([val.player1[0].id, val.player1[1].id], [val.player2[0].id, val.player2[1].id])
            return acc;
        }, [])) : null;

        if (!isDYP) {
            const players = tournamentPlayers.reduce((acc: Players, val) => {
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
            return players;
        }
        else {
            if (!pairs) return {};
            const players = pairs.reduce((acc: Players, val) => {
                const pName = `${normalizedPlayers[val[0]]?.name} / ${normalizedPlayers[val[1]]?.name}`;
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
            return players;
        }
    }

    const calculatePlayersDataWithStats = (): Players => {
        const pointsForWin = fetchedTournamentData?.pointsForWin;
        const pointsForDraw = fetchedTournamentData?.pointsForDraw;
        const tournamentPlayers = fetchedPlayers.filter(p => tournamentPlayerIds && tournamentPlayerIds?.indexOf(p.id) >= 0)
        if (typeof pointsForWin !== 'number' || typeof pointsForDraw !== 'number') return {};

        const initialPlayers = getPlayersInitialData(tournamentPlayers);

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

            // SINGLE, TEAM, MONSTER DYP
            if (id1_0 && id2_0 && acc[id1_0] && acc[id2_0] && ((!id1_1 && !id2_1) || fetchedTournamentData?.monsterDYP)) {
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

                // MONSTER DYP ONLY
                if (id1_1 && id2_1 && acc[id1_1] && acc[id2_1]) {
                    acc[id1_1].numberOfGames++;
                    acc[id2_1].numberOfGames++;
                    acc[id1_1].goals += scores1Sum;
                    acc[id2_1].goals += scores2Sum;
                    acc[id1_1].goalsIn += scores2Sum;
                    acc[id2_1].goalsIn += scores1Sum;
                    if (score1 > score2) {
                        acc[id1_1].points += pointsForWin;
                        acc[id1_1].matchesWon += 1;
                        acc[id2_1].matchesLost += 1;
                        acc[id2_1].lives--;
                    }
                    if (score1 < score2) {
                        acc[id1_1].points += pointsForWin;
                        acc[id1_1].matchesLost += 1;
                        acc[id2_1].matchesWon += 1;
                        acc[id1_1].lives--;
                    }
                    if (score1 === score2) {
                        acc[id1_1].points += pointsForDraw;
                        acc[id2_1].points += pointsForDraw;
                    }
                }
            }
            // DYP
            else if (id1_0 && id2_0 && id1_1 && id2_1) {
                const participant1Name = `${normalizedPlayers[id1_0]?.name} / ${normalizedPlayers[id1_1]?.name}`;
                const participant2Name = `${normalizedPlayers[id2_0]?.name} / ${normalizedPlayers[id2_1]?.name}`;
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
        }, initialPlayers);

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

    const searchActionCallback = (value: string) => {
        setSearchValue(value)
    }

    const handleSortOrderChange = () => {
        dispatch(updateSettings({ lmsRoundSortOrder: settingsState.lmsRoundSortOrder === 1 ? -1 : 1 }));
    };

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
                <div
                    className={classes.tournamentGameContainerHeader}
                    style={!KEKW ? {} :
                        {
                            backgroundImage: `url("${KEKWemote}")`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPositionX: "center"
                        }}>
                    <Tooltip title={settingsState.lmsRoundSortOrder === 1 ? `${t("Sort Descending")}` : `${t("Sort Ascending")}`}>
                        <IconButton className={classes.sortIconButton} aria-label="toggle-sort-order" onClick={handleSortOrderChange}>
                            <SortIcon className={classes.icon} style={settingsState.lmsRoundSortOrder === 1 ? { transform: 'rotateX(180deg)' } : {}} />
                        </IconButton>
                    </Tooltip>
                    <SearchField
                        actionCallback={searchActionCallback}
                        styles={{
                            inputStyle: {
                                color: '#c5c8cb',
                                fontWeight: 200

                            },
                            searchIconStyle: { color: '#c5c8cb', fontSize: 26 },
                            closeIconStyle: { color: '#c5c8cb' }
                        }}
                    />
                </div>
                <div className={classes.tournamentGameContainerBody} style={settingsState.lmsRoundSortOrder === 1 ? { flexDirection: 'column' } : { flexDirection: 'column-reverse' }}>
                    <CardContent className={classes.cardContent}>
                        {tournamentGameRounds?.sort((a, b) => {
                            return (a - b > 0) ?
                                1 * (settingsState.lmsRoundSortOrder || 1) :
                                -1 * (settingsState.lmsRoundSortOrder || 1);
                        }).map(round => {
                            return (
                                <GameListRound
                                    key={`gameListRound_${round}`}
                                    tournamentId={tournamentId}
                                    roundNubmer={round}
                                    maxScores={maxScores}
                                    normalizedPlayers={normalizedPlayers}
                                    searchFilterValue={searchValue}
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
                </div>
            </Card>
            {settingsState.tournamentSidebar && <div className={classes.tournamentGameSidebar}>
                <Card className={classes.cardRootSideTop}>
                    <LastManStandingPlayerStatsList playerData={playerData} kekw={KEKW} />
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
