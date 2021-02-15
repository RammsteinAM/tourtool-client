import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AppBar from '@material-ui/core/AppBar';
import InputIcon from '@material-ui/icons/Input';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { shuffleArray } from '../../../utils/arrayUtils';
import { updatePlayers } from '../../../redux/tournamentEntities/actions';
import headerStyles from './headerStyles';
import ImportParticipantsDialog from '../../Tournament/ImportParticipantsDialog';

interface Props {
    title: string;
    backButton?: boolean;
    importPlayersButton?: boolean;
    shufflePlayersButton?: boolean;
    nextButton?: boolean;
    nextButtonForm?: string;
}

const HeaderGeneric = (props: Props) => {
    const classes = headerStyles();
    const history = useHistory();
    const [path, setPath] = useState('');
    const [importparticipantsDialogOpen, setImportparticipantsDialogOpen] = useState<boolean>(false);
    const entityState = useSelector((state: RootState) => state.entities);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        setPath(history.location.pathname)

    })

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

    return (
        <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
                {props.title}
            </Typography>
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
