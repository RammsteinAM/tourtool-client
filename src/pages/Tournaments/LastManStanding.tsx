import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { FetchedTournament } from '../../types/entities';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { entityActions } from '../../redux/tournamentEntities/actions';
import { useResizeDetector } from 'react-resize-detector';
import GameListRound from '../../components/Tournament/GameListRound';
import LastManStandingPlayerStatsList from '../../components/Tournament/TournamentStats/LastManStandingPlayerStatsList';
import { getNormalizedParticipants, multiDimensionalUnique } from '../../utils/arrayUtils';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import SortIcon from '@material-ui/icons/Sort';
import ShareIcon from '@material-ui/icons/Share';
import { splitGameKey } from '../../utils/stringUtils';
import { useHistory, useParams } from 'react-router-dom';
import { gameActions } from '../../redux/games/actions';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SearchField from '../../components/SearchField';
import useKonamiCode from '../../hooks/Konami';
import { updateSettings } from '../../redux/settings/actions';
import { calculatePlayersDataWithStats } from '../../helpers/tournamentHelpers';
import lastManStandingStyles from './lastManStandingStyles';
import { watchTournamentActions } from '../../redux/watchTournament/actions';
import toast from '../../components/IndependentSnackbar';

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
    const bttvMode = useKonamiCode()
    const { width, ref: resizeRef } = useResizeDetector({ handleWidth: true, handleHeight: false, refreshMode: 'debounce', refreshRate: 300 });
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const shareLinkRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = lastManStandingStyles();
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10);
    const fetchedTournamentData: FetchedTournament = entityState.fetchedTournaments.data[tournamentId];
    const tournamentGames = fetchedGames[tournamentId];
    const fetchedPlayers = entityState.fetchedPlayers.data;
    const { t } = useTranslation();
    const origin = window.location.origin;
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
        if (!tournamentGames || tournamentGames.length === 0) {
            dispatch(gameActions.getTournamentGames(tournamentId));
        }
    }, [tournamentGames])

    useEffect(() => {
        const playerData = fetchedTournamentData && tournamentGames && calculatePlayersDataWithStats(fetchedTournamentData, tournamentGames, fetchedPlayers, normalizedPlayers, isDYP);
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

    const handleShowResult = () => {
        history.push(`${history.location.pathname}/result`)
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

    const handleToggleShareTournament = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!fetchedTournamentData.shareId) {
            dispatch(watchTournamentActions.giveTournamentShareAccess(fetchedTournamentData.id));
            return;
        }
        dispatch(watchTournamentActions.revokeTournamentShareAccess(fetchedTournamentData.id));
    };

    const handleClickCopyLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (shareLinkRef.current) {
            shareLinkRef.current.select();
            document.execCommand('copy');
            toast.success(t('Link Copied'));
        }
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
                    <div className={classes.tournamentGameContainerHeaderLeftPart}>
                        <Tooltip title={settingsState.lmsRoundSortOrder === 1 ? `${t("Sort Descending")}` : `${t("Sort Ascending")}`}>
                            <IconButton className={classes.sortIconButton} aria-label="toggle-sort-order" onClick={handleSortOrderChange}>
                                <SortIcon className={classes.icon} style={settingsState.lmsRoundSortOrder === 1 ? { transform: 'rotateX(180deg)' } : {}} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={`${t("Share Tournament Watch Link")}`}>
                            <div className={classes.shareContainer}>
                                <div className={classes.shareIconContainer}>
                                    <ShareIcon />
                                </div>
                                <Switch
                                    checked={!!fetchedTournamentData.shareId}
                                    onChange={handleToggleShareTournament}
                                    name="checkedB"
                                    color="primary"
                                />
                            </div>
                        </Tooltip>
                        {fetchedTournamentData.shareId &&
                            <FormControl className={classes.shareLinkInputContainer}>
                                <Input
                                    id="standard-adornment-password"
                                    className={classes.shareLinkTextField}
                                    fullWidth
                                    value={`${origin}/watch/${fetchedTournamentData.shareId}`}
                                    inputRef={shareLinkRef}
                                    onClick={() => {
                                        if (shareLinkRef && shareLinkRef.current) {
                                            shareLinkRef.current.select();
                                        }
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                size="small"
                                                onClick={handleClickCopyLink}
                                            >
                                                <FileCopyIcon style={{ fontSize: 20, color: '#c5c8cb' }} />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        }
                    </div>

                    <div>

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
                    <LastManStandingPlayerStatsList playerData={playerData} bttvMode={bttvMode} />
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
