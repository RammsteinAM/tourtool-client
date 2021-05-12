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
import PrintIcon from '@material-ui/icons/Print';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ReactComponent as LastManStandingIcon } from '../../../resources/icons/lms.svg';
import { ReactComponent as EliminationIcon } from '../../../resources/icons/elimination.svg';
import { HeaderSlider } from '../../Slider';
import { debounce } from 'lodash';
import { updateSettings } from '../../../redux/settings/actions';
import headerStyles from './headerStyles';
import { WatchTournamentReducerState } from '../../../redux/watchTournament/types';

interface Props {
    zoomSlider?: boolean;
    fullScreenButton?: boolean;
    tournamentSidebar?: boolean;
    backToTournament?: boolean;
    icon?: React.ReactNode;
}

const HeaderWatchTournament = (props: Props) => {
    const classes = headerStyles();
    const settingsState = useSelector((state: RootState) => state.settings);
    const watchTournamentState = useSelector((state: RootState) => state.watchTournament);

    const { tournamentShareId } = useParams<{ tournamentShareId: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    const watchTournamentData = watchTournamentState.data.tournamentData;

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

    const handlePrint = () => {
        window.print();
    }

    const handleBackButton = () => {
        const path = history.location.pathname.substring(0, history.location.pathname.lastIndexOf('/'))
        history.push(path);
    }

    if (!watchTournamentData) {
        return null;
    }

    const renderIcon = () => {
        if (watchTournamentData.tournamentTypeId === 1) {
            return <EliminationIcon width={36} height={36} fill='#404040' />
        }
        if (watchTournamentData.tournamentTypeId === 2) {
            return <LastManStandingIcon width={36} height={36} fill='#404040' />
        }
        return null;
    }

    const { icon: Icon } = props;
    return (
        <Toolbar className={classes.root}>
            <div style={{ marginRight: '12px', display: 'flex' }}>{renderIcon()}</div>
            <Typography variant="h6" noWrap className={classes.tournamentName}>
                {watchTournamentData.name}
            </Typography>
            {props.backToTournament &&
                <Tooltip title={`${t("Return to the Tournament")}`}>
                    <IconButton className={classes.iconButton} aria-label="back" onClick={handleBackButton}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Tooltip>
            }
            {props.zoomSlider &&
                <HeaderSlider onChange={handleZoomSliderChange} defaultValue={settingsState.eliminationScale ? settingsState.eliminationScale * 100 : 100} />
            }
            {props.tournamentSidebar ? <Tooltip title={settingsState.tournamentSidebar ? `${t("Hide Standings")}` : `${t("Show Standings")}`}>
                <IconButton className={classes.iconButton} aria-label="toggle-standings" onClick={handleToggleTournamentSidebarButton}>
                    <ListIcon />
                </IconButton>
            </Tooltip> : null}
            <Tooltip title={`${t("Print")}`}>
                <IconButton className={classes.iconButton} aria-label="print" onClick={handlePrint}>
                    <PrintIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={`${t("Full Screen")}`}>
                <IconButton className={classes.iconButton} aria-label="full-screen" onClick={handleEnterFullScreen}>
                    <FullscreenIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    )
}

export default HeaderWatchTournament
