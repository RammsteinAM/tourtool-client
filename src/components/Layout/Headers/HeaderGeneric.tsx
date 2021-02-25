import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputIcon from '@material-ui/icons/Input';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { shuffleArray } from '../../../utils/arrayUtils';
import { updatePlayers, updateTournament } from '../../../redux/tournamentEntities/actions';
import ImportParticipantsDialog from '../../Tournament/ImportParticipantsDialog';
import { HeaderSlider } from '../../Slider';
import { debounce, throttle } from 'lodash';
import { updateSettings } from '../../../redux/settings/actions';
import headerStyles from './headerStyles';

interface Props {
    title: string;
    backButton?: boolean;
    importPlayersButton?: boolean;
    shufflePlayersButton?: boolean;
    nextButton?: boolean;
    nextButtonForm?: string;
    thirdPlaceCheckbox?: boolean;
    zoomSlider?: boolean;
    fullScreenButton?: boolean;
}

const HeaderGeneric = (props: Props) => {
    const classes = headerStyles();
    const history = useHistory();
    const [path, setPath] = useState('');
    const [importparticipantsDialogOpen, setImportparticipantsDialogOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const settingsState = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        setPath(history.location.pathname)

    })

    const handleThirdPlaceCheckboxChange = () => {
        dispatch(updateTournament({ thirdPlace: !entityState.tournament.thirdPlace }))
        //setCheckboxSetPlayers(!checkboxSetPlayers);
    };

    const handleBackButton = () => {
        history.goBack()
    }

    const handleShufflePlayersButton = () => {
        const storePlayer = entityState.players;
        const shuffledPlayers = shuffleArray(storePlayer);
        dispatch(updatePlayers(shuffledPlayers));
    }

    const handleImportparticipantsOpen = () => {
        setImportparticipantsDialogOpen(true);
    }

    const handleImportparticipantsClose = () => {
        setImportparticipantsDialogOpen(false);
    }

    const delayedUpdateZoomLevel = useCallback(debounce((val: number) => dispatch(updateSettings({ eliminationScale: val })), 100), [settingsState.eliminationScale]);

    const handleZoomSliderChange = (event: any, newValue: number | number[]) => {
        //throttle
        //debugger
        const zoomLevel = (0.67 * (newValue as number) / 100) + 0.33;
        delayedUpdateZoomLevel(zoomLevel);
        //setZoomValue(newValue as number);
    };

    const handleEnterFullScreen = () => {
        dispatch(updateSettings({ fullScreen: true }))
    }

    return (
        <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
                {props.title}
            </Typography>
            {props.zoomSlider &&
                <HeaderSlider onChange={handleZoomSliderChange} defaultValue={100} />
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
            {props.shufflePlayersButton &&
                <Tooltip title={`${t("Shuffle Participants")}`}>
                    <IconButton className={classes.iconButton} aria-label="shuffle-participants" onClick={handleShufflePlayersButton}>
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
                //onClick={handleSubmit}
                >
                    {t('Next')}
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
