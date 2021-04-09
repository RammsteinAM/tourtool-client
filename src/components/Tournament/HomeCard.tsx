import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Whatshot from '@material-ui/icons/Whatshot';
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as RoundRobinIcon } from '../../resources/icons/roundRobin.svg';
import { ReactComponent as LastManStandingIcon } from '../../resources/icons/lms.svg';
import { ReactComponent as Elimination } from '../../resources/icons/elimination.svg';
import { FetchedTournament } from '../../types/entities';
// import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/hy-am';
import { useDispatch } from 'react-redux';
import { entityActions } from '../../redux/tournamentEntities/actions';
import { capitalizeNthChar } from '../../utils/stringUtils';
import { getFullLocale } from '../../utils/i18n';
import mainStyles from '../../styles/mainStyles';
import homeCard from './homeCardStyles';
import Dialog from '../Dialogs/Generic/Dialog';
import { tournamentTypeIds } from '../../utils/constants';
import { getKeyByValue } from '../../utils/objectUtils';

interface Props {
    data: FetchedTournament;
}

const TournamentTypeSelect = (props: Props) => {
    const [nameEditing, setNameEditing] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>(props.data?.name);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = homeCard();
    const mainClasses = mainStyles();
    const { t } = useTranslation();
    const locale = getFullLocale().toLowerCase();
    // moment.locale(locale);
    const tournamentTypeKey = getKeyByValue(tournamentTypeIds,props.data.tournamentTypeId);

    const handleOpenTournament = () => {
        history.push(`/${tournamentTypeKey}/${props.data.id}`)
    }

    const handleStartRename = () => {
        setNameEditing(true);
    }

    const handleDiscardRename = () => {
        setName(props.data.name);
        setNameEditing(false);
    }

    const handleRenameConfirm = () => {
        dispatch(entityActions.editTournament({ id: props.data.id, name }));
        setNameEditing(false);
    }

    const handleDeleteConfirm = () => {
        dispatch(entityActions.deleteTournament(props.data.id));
        setDeleteDialogOpen(false);
    }

    const handleDeleteButton = () => {
        setDeleteDialogOpen(true);
    }

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleRenameConfirm();
        }
        if (e.key === "Escape") {
            setNameEditing(false);
            setName(props.data.name);
        }
    }

    const renderLeftPart = () => {
        switch (props.data.tournamentTypeId) {
            case 1:
                return (
                    <CardContent
                        className={classes.cardIconContainer}
                        style={{ backgroundColor: '#8dbb5e' }}
                    >

                        <Elimination className={classes.cardIcon} />
                    </CardContent>

                )
            case 2:
                return (
                    <div
                        className={classes.cardIconContainer}
                        style={{ backgroundColor: '#9c27b0' }}
                    >
                        <LastManStandingIcon className={classes.cardIcon} />
                    </div>
                )
            case 3:
                return (
                    <CardContent
                        className={classes.cardIconContainer}
                        style={{ backgroundColor: '#00b8d4' }}
                    >
                        {
                            <RoundRobinIcon className={classes.cardIcon} />}
                    </CardContent>
                )
        }
    }

    return (
        <Card className={classes.cardRoot}>
            {renderLeftPart()}
            <div className={classes.cardContainer}>
                <CardContent className={classes.cardContent}>
                    <div className={classes.cardTitle}>
                        {!nameEditing ?
                            <Typography noWrap className={classes.name}>
                                {props.data.name}
                            </Typography> :
                            <TextField
                                size="small"
                                fullWidth
                                value={name}
                                autoFocus
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                onKeyDown={handleInputKeyDown}
                                className={mainClasses.textField}
                            />
                        }
                        <div className={classes.date}>
                            <Tooltip title={`${t('Creation Date')}`}>
                                <span>{capitalizeNthChar(moment(props.data.createdAt).locale(locale).format('MMM DD, YYYY'))}</span>
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        {!nameEditing ?
                            <Tooltip title={`${t("Rename")}`}>
                                <IconButton aria-label="info" onClick={handleStartRename}>
                                    <Edit />
                                </IconButton>
                            </Tooltip> :
                            <>
                                <Tooltip title={`${t("Cancel")}`}>
                                    <IconButton aria-label="info" onClick={handleDiscardRename}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={`${t("Confirm")}`}>
                                    <IconButton aria-label="info" onClick={handleRenameConfirm}>
                                        <DoneIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        }
                    </div>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <Tooltip title={`${t("Delete")}`}>
                        <IconButton onClick={handleDeleteButton} >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={`${t("Open Tournament")}`}>
                        <IconButton onClick={handleOpenTournament} >
                            <PlayArrowIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </div>
            <Dialog
                open={deleteDialogOpen}
                titleText={t('confirm-tournament-delete-title')}
                bodyText={t('confirm-tournament-delete-body')}
                onClose={() => { setDeleteDialogOpen(false) }}
                onConfirm={handleDeleteConfirm}
                dialogType='warning'
                confirmButtonText={t('Delete')}
            />
        </Card>
    )
}

export default TournamentTypeSelect
