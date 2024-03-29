import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { splitGameKey } from '../../utils/stringUtils';
import EliminationColumn from '../../components/Tournament/Elimination/EliminationColumn';
import EliminationCards from '../../components/Tournament/Elimination/EliminationCards';
import { getNormalizedGames, getNormalizedParticipants } from '../../utils/arrayUtils';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { entityActions } from '../../redux/tournamentEntities/actions';
import { gameActions } from '../../redux/games/actions';
import { useTranslation } from "react-i18next";
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import ShareIcon from '@material-ui/icons/Share';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { watchTournamentActions } from '../../redux/watchTournament/actions';
import toast from '../../components/IndependentSnackbar';
import tournamentStyles from './tournamentStyles';

const Elimination = () => {
    const [progress, setProgress] = useState<number>(0);
    const [tablesByGameIndex, setTablesByGameIndex] = useState<{ [index: string]: number }>({});
    const dispatch = useDispatch();
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const shareLinkRef = useRef<HTMLInputElement>(null);
    const classes = tournamentStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10)
    const fetchedTournament = useSelector((state: RootState) => state.entities.fetchedTournaments.data[tournamentId]);
    const fetchedGames = useSelector((state: RootState) => state.games.data);
    const tournamentGames = fetchedGames[tournamentId];

    useEffect(() => {
        dispatch(entityActions.getTournament(tournamentId));
        dispatch(entityActions.getPlayers());
        dispatch(gameActions.getTournamentGames(tournamentId));
    }, [])

    useEffect(() => {
        const playableGames = tournamentGames?.filter(game => (
            !game.hasByePlayer
        ));
        const uncompleteGames = tournamentGames?.filter(game => (
            !game.hasByePlayer && game.scores1 && game.scores2 && ((!game.scores1 && !game.scores2) || (game.scores1.length === 0 && game.scores2.length === 0))
        ));
        const tournamentProgress: number = 100 * (playableGames?.length - uncompleteGames?.length) / playableGames?.length
        setProgress(tournamentProgress);
    }, [tournamentGames])

    useEffect(() => {
        if (fetchedTournament && fetchedTournament.tablesByGameIndex) {
            setTablesByGameIndex(fetchedTournament.tablesByGameIndex);
        }
    }, [fetchedTournament])

    if (!tournamentGames) {
        return null;
    }

    const handleToggleShareTournament = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!fetchedTournament.shareId) {
            dispatch(watchTournamentActions.giveTournamentShareAccess(fetchedTournament.id));
            return;
        }
        dispatch(watchTournamentActions.revokeTournamentShareAccess(fetchedTournament.id));
    };

    const handleClickCopyLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (shareLinkRef.current) {
            shareLinkRef.current.select();
            document.execCommand('copy');
            toast.success(t('Link Copied'));
        }
    }

    const games = getNormalizedGames(tournamentGames);
    const normalizedPlayers = getNormalizedParticipants(entityState.fetchedPlayers.data);

    const firstRoundGameNumber = tournamentGames.length === 1 ? 1 : tournamentGames.filter(game => splitGameKey(game.index).round === 1).length;
    const numberOfColumns = Math.round(Math.log(tournamentGames.length + 1) / Math.log(2));

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
                        const numberOfGames = Math.ceil(firstRoundGameNumber / (2 ** (colNumber - 1)));
                        return (
                            <EliminationColumn
                                key={key}
                                numberOfColumns={numberOfColumns}
                                firstRoundGameNumber={firstRoundGameNumber}
                                colNumber={colNumber}
                            >
                                <EliminationCards
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
            <div className={classes.shareContainer}>
                <Tooltip title={`${t("Share Tournament Watch Link")}`}>
                    <div className={classes.shareToggleContainer}>
                        <div className={classes.shareIconContainer}>
                            <ShareIcon style={!!fetchedTournament.shareId ? {color: '#8ebd5e'} : {color: '#888888'}} />
                        </div>
                        <Switch
                            checked={!!fetchedTournament.shareId}
                            onChange={handleToggleShareTournament}
                            name="checkedB"
                            color="primary"
                        />
                    </div>
                </Tooltip>
                {fetchedTournament.shareId &&
                    <FormControl className={classes.shareLinkInputContainer}>
                        <Input
                            id="standard-adornment-password"
                            className={classes.shareLinkTextField}
                            fullWidth
                            value={`${origin}/watch/${fetchedTournament.shareId}`}
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
        </>
    )
}

export default Elimination
