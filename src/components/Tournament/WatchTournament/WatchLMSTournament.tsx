import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useTranslation } from "react-i18next";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import SortIcon from '@material-ui/icons/Sort';
import { splitGameKey } from '../../../utils/stringUtils';
import SearchField from '../../../components/SearchField';
import useKonamiCode from '../../../hooks/Konami';
import { updateSettings } from '../../../redux/settings/actions';
import { calculatePlayersDataWithStatsForWatch } from '../../../helpers/tournamentHelpers';
import { FetchedTournamentForView } from '../../../types/entities';
import { useHistory } from 'react-router-dom';
import LastManStandingPlayerStatsListForWatch from './LastManStandingPlayerStatsListForWatch';
import GameListRoundForWatch from './GameListRoundForWatch';
import lastManStandingStyles from '../../../pages/Tournaments/lastManStandingStyles';

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
    data: FetchedTournamentForView;
}

const WatchLMSTournament = ({ data }: Props) => {
    const [playerData, setPlayerData] = useState<Players>({});
    const [searchValue, setSearchValue] = useState<string>('');
    const bttvMode = useKonamiCode()
    const settingsState = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const classes = lastManStandingStyles();

    const normalizedPlayers = data.players && data.players.reduce((acc: { [id: number]: string }, val) => {
        if (!val.id || !val.name) {
            return acc;
        }
        acc[val.id] = val.name;
        return acc;
    }, {});

    useEffect(() => {
        const playerData = data && normalizedPlayers && calculatePlayersDataWithStatsForWatch(data, normalizedPlayers);
        playerData && setPlayerData(playerData);
    }, [data])

    if (!data.players || !normalizedPlayers) {
        return null
    }

    const tournamentGameRounds = data.games && [...new Set(data.games.map(game => splitGameKey(game.index).round))]

    const handleShowResult = () => {
        history.push(`${history.location.pathname}/result`);
    }

    const searchActionCallback = (value: string) => {
        setSearchValue(value)
    }

    const handleSortOrderChange = () => {
        dispatch(updateSettings({ lmsRoundSortOrder: settingsState.lmsRoundSortOrder === 1 ? -1 : 1 }));
    };

    return (
        <div className={classes.tournamentGameRoot}>
            <Card
                className={classes.cardRoot}
                style={{ width: `calc(100% - ${settingsState.tournamentSidebar ? 362 : 0}px)`, marginRight: settingsState.tournamentSidebar ? '12px' : '0px' }}
            >
                <div className={classes.tournamentGameContainerHeader}>
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
                                <GameListRoundForWatch
                                    key={`gameListRound_${round}`}
                                    tournamentData={data}
                                    roundNubmer={round}
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
                    </CardActions>
                </div>
            </Card>
            {settingsState.tournamentSidebar && <div className={classes.tournamentGameSidebar}>
                <Card className={classes.cardRootSideTop}>
                    <LastManStandingPlayerStatsListForWatch playerData={playerData} normalizedPlayers={normalizedPlayers} bttvMode={bttvMode} />
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

export default WatchLMSTournament
