import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { splitGameKey } from '../../../utils/stringUtils';
import EliminationColumn from '../Elimination/EliminationColumn';
import EliminationCards from '../Elimination/EliminationCards';
import { getNormalizedGames, getNormalizedGamesForWatch, getNormalizedParticipants } from '../../../utils/arrayUtils';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { entityActions } from '../../../redux/tournamentEntities/actions';
import { gameActions } from '../../../redux/games/actions';
import { useTranslation } from "react-i18next";
import { FetchedTournamentForView } from '../../../types/entities';
import tournamentStyles from '../../../pages/Tournaments/tournamentStyles';
import EliminationCardsForWatch from './EliminationCardsForWatch';

interface Props {
    data: FetchedTournamentForView;
}

const WatchEliminationTournament = ({ data }: Props) => {
    const [progress, setProgress] = useState<number>(0);
    const [tablesByGameIndex, setTablesByGameIndex] = useState<{ [index: string]: number }>({});
    const dispatch = useDispatch();
    // const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const classes = tournamentStyles();
    const history = useHistory();
    const { t } = useTranslation();
    
    const normalizedPlayers = data.players && data.players.reduce((acc: { [id: number]: string }, val) => {
        if (!val.id || !val.name) {
            return acc;
        }
        acc[val.id] = val.name;
        return acc;
    }, {});
    // const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    // const tournamentId = parseInt(tournamentIdString, 10)
    // const fetchedTournament = useSelector((state: RootState) => state.entities.fetchedTournaments.data[tournamentId]);
    // const fetchedGames = useSelector((state: RootState) => state.games.data);
    // const tournamentGames = fetchedGames[tournamentId];

    // useEffect(() => {
    //     dispatch(entityActions.getTournament(tournamentId));
    //     dispatch(entityActions.getPlayers());
    //     dispatch(gameActions.getTournamentGames(tournamentId));
    // }, [])

    useEffect(() => {
        const playableGames = data.games?.filter(game => (
            !game.hasByePlayer
        ));
        const uncompleteGames = data.games?.filter(game => (
            !game.hasByePlayer && game.scores1 && game.scores2 && ((!game.scores1 && !game.scores2) || (game.scores1.length === 0 && game.scores2.length === 0))
        ));
        const tournamentProgress: number = 100 * (playableGames?.length - uncompleteGames?.length) / playableGames?.length
        setProgress(tournamentProgress);
    }, [data.games])

    useEffect(() => {
        if (data.tablesByGameIndex) {
            setTablesByGameIndex(data.tablesByGameIndex);
        }
    }, [data.tablesByGameIndex])

    if (!data.games || !normalizedPlayers) {
        return null;
    }

    const games = getNormalizedGamesForWatch(data.games);
    // const normalizedPlayers = getNormalizedParticipants(entityState.fetchedPlayers.data);

    const firstRoundGameNumber = data.games.length === 1 ? 1 : data.games.filter(game => splitGameKey(game.index).round === 1).length;
    const numberOfColumns = Math.round(Math.log(data.games.length + 1) / Math.log(2));

    return (
        <>
            <div className={classes.eliminationProgressContainer}>
                <LinearProgress variant="determinate" color="secondary" value={progress} />
            </div>
            <div className={classes.eliminationContainer}>
                <div
                    className={classes.eliminationCardsContainer}
                    style={{ transform: `scale(${settingsState.eliminationScale || '1'})` }}
                >
                    {[...Array(Math.round(numberOfColumns)).keys()].map(key => {
                        const colNumber = key + 1;
                        const numberOfGames = firstRoundGameNumber / (2 ** (colNumber - 1));
                        return (
                            <EliminationColumn
                                key={key}
                                numberOfColumns={numberOfColumns}
                                firstRoundGameNumber={firstRoundGameNumber}
                                colNumber={colNumber}
                            >
                                <EliminationCardsForWatch
                                    games={games}
                                    columnNumber={colNumber}
                                    numberOfGames={numberOfGames}
                                    normalizedPlayers={normalizedPlayers}
                                    gameIndexesForActiveTables={tablesByGameIndex}
                                />
                            </EliminationColumn>
                        )
                    }
                    )}
                </div>
            </div>
            {progress === 100 &&
                <div className={classes.eliminationSnackbarContainer}>
                    <SnackbarContent
                        message={t('Tournament Completed')}
                        className={classes.eliminationSnackbar}
                        action={
                            <Button
                                className={classes.eliminationSnackbarButton}
                                onClick={() => { history.push(`${history.location.pathname}/result`) }}
                            >
                                {t('Show Result')}
                            </Button>
                        }
                    />
                </div>
            }
        </>
    )
}

export default WatchEliminationTournament
