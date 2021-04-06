import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputIcon from '@material-ui/icons/Input';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import ListIcon from '@material-ui/icons/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { shuffleArray } from '../../../utils/arrayUtils';
import { updateParticipants, updateEliminationPlayers, updateTournament } from '../../../redux/tournamentEntities/actions';
import ImportParticipantsDialog from '../../Tournament/ImportParticipantsDialog';
import { HeaderSlider } from '../../Slider';
import { debounce } from 'lodash';
import { updateSettings } from '../../../redux/settings/actions';
import headerStyles from './headerStyles';

interface Props {
    title?: string;
    backButton?: boolean;
    importPlayersButton?: boolean;
    shuffleEliminationPlayersButton?: boolean;
    shuffleParticipantsButton?: boolean;
    nextButton?: boolean;
    /** Default value is `Next`. */
    nextButtonText?: string;
    nextButtonForm?: string;
    thirdPlaceCheckbox?: boolean;
    zoomSlider?: boolean;
    fullScreenButton?: boolean;
    tournamentName?: boolean;
    showIcon?: boolean;
    tournamentSidebar?: boolean;
    icon?: React.ReactNode;
}

const HeaderGeneric = (props: Props) => {
    const classes = headerStyles();
    const [path, setPath] = useState('');
    const [importparticipantsDialogOpen, setImportparticipantsDialogOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const fetchedTournamentsdata = useSelector((state: RootState) => state.entities.fetchedTournaments.data);
    const settingsState = useSelector((state: RootState) => state.settings);
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const tournamentId = parseInt(tournamentIdString, 10)

    useEffect(() => {
        setPath(history.location.pathname)

    })

    const handleThirdPlaceCheckboxChange = () => {
        dispatch(updateTournament({ thirdPlace: !entityState.tournament.thirdPlace }))
    };

    const handleBackButton = () => {
        history.goBack();
    }

    const handleShuffleParticipantsButton = () => {
        const storeParticipants = entityState.participants;
        const shuffledParticipants = shuffleArray(storeParticipants);
        dispatch(updateParticipants(shuffledParticipants));
    }

    const handleShuffleEliminationPlayersButton = () => {
        const storePlayers = entityState.eliminationPlayers;
        const shuffledPlayers = shuffleArray(storePlayers);
        dispatch(updateEliminationPlayers(shuffledPlayers));
    }

    const handleImportparticipantsOpen = () => {
        setImportparticipantsDialogOpen(true);
    }

    const handleImportparticipantsClose = () => {
        setImportparticipantsDialogOpen(false);
    }

    const delayedUpdateZoomLevel = useCallback(
        debounce((val: number) => dispatch(updateSettings({ eliminationScale: val })), 70),
        [settingsState.eliminationScale]
    );

    const handleZoomSliderChange = (event: any, newValue: number | number[]) => {
        const zoomLevel = (0.67 * (newValue as number) / 100) + 0.33;
        delayedUpdateZoomLevel(zoomLevel);
    };

    const handleToggleTournamentSidebarButton = () => {
        dispatch(updateSettings({ tournamentSidebar: !settingsState.tournamentSidebar }))
    }

    const handleEnterFullScreen = () => {
        dispatch(updateSettings({ fullScreen: true }))
    }

    const { icon: Icon } = props;
    return (
        <Toolbar className={classes.root}>
            {props.showIcon &&
                <div style={{ marginRight: '12px', display: 'flex' }}>{props.icon}</div>
            }
            {props.tournamentName && fetchedTournamentsdata[tournamentId] && <Typography variant="h6" noWrap className={classes.tournamentName}>
                {fetchedTournamentsdata[tournamentId].name}
            </Typography>}
            <Typography variant="h6" noWrap className={classes.title}>
                {props.title}
            </Typography>
            {props.zoomSlider &&
                <HeaderSlider onChange={handleZoomSliderChange} defaultValue={100} />
            }
            {props.tournamentSidebar &&
                <Tooltip title={settingsState.tournamentSidebar ? `${t("Hide Standings")}` : `${t("Show Standings")}`}>
                    <IconButton className={classes.iconButton} aria-label="toggle-standings" onClick={handleToggleTournamentSidebarButton}>
                        <ListIcon />
                    </IconButton>
                </Tooltip>
            }
            {props.fullScreenButton &&
                <Tooltip title={`${t("Full Screen")}`}>
                    <IconButton className={classes.iconButton} aria-label="full-screen" onClick={handleEnterFullScreen}>
                        <FullscreenIcon />
                    </IconButton>
                </Tooltip>
            }
            {props.thirdPlaceCheckbox &&
                <FormControlLabel
                    value="start"
                    classes={{ label: classes.checkboxLabel }}
                    className={classes.checkbox}
                    control={
                        <Checkbox
                            size='small'
                            checked={entityState.tournament.thirdPlace}
                            onChange={handleThirdPlaceCheckboxChange}
                            color="primary"
                        />
                    }
                    label={t('Match for Third Place')}
                    labelPlacement="start"
                />
            }
            {props.importPlayersButton &&
                <Tooltip title={`${t("Import Participants")}`}>
                    <IconButton className={classes.iconButton} aria-label="shuffle-participants" onClick={handleImportparticipantsOpen}>
                        <InputIcon />
                    </IconButton>
                </Tooltip>
            }
            {props.shuffleParticipantsButton &&
                <Tooltip title={`${t("Shuffle Participants")}`}>
                    <IconButton className={classes.iconButton} aria-label="shuffle-participants" onClick={handleShuffleParticipantsButton}>
                        <ShuffleIcon />
                    </IconButton>
                </Tooltip>
            }
            {props.shuffleEliminationPlayersButton &&
                <Tooltip title={`${t("Shuffle Players")}`}>
                    <IconButton className={classes.iconButton} aria-label="shuffle-players" onClick={handleShuffleEliminationPlayersButton}>
                        <ShuffleIcon />
                    </IconButton>
                </Tooltip>
            }
            {props.backButton &&
                <Tooltip title={`${t("Return to Previous Step")}`}>
                    <IconButton className={classes.iconButton} aria-label="back" onClick={handleBackButton}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Tooltip>
            }
            {props.nextButton &&
                <Button
                    form={props.nextButtonForm}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                >
                    {props.nextButtonText || t('Next')}
                </Button>
            }
            <ImportParticipantsDialog
                open={importparticipantsDialogOpen}
                onClose={handleImportparticipantsClose}
            />
        </Toolbar>
    )
}

export default HeaderGeneric
