import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import HeaderGeneric from './HeaderGeneric';
import HeaderHome from './HeaderHome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { ReactComponent as RoundRobinIcon } from '../../../resources/icons/roundRobin.svg';
import { ReactComponent as LastManStandingIcon } from '../../../resources/icons/lms.svg';
import { ReactComponent as EliminationIcon } from '../../../resources/icons/elimination.svg';
import { updateSettings } from '../../../redux/settings/actions';
import headerStyles from './headerStyles';
import HeaderWatchTournament from './HeaderWatchTournament';

interface Props {
    menuOpen: boolean,
}

const Header = (props: Props) => {
    const [newPlayers, setNewPlayers] = useState<boolean>();
    const classes = headerStyles();
    // const history = useHistory();
    const fullScreen = useSelector((state: RootState) => state.settings.fullScreen);
    const fetchedPlayers = useSelector((state: RootState) => state.entities.fetchedPlayers.data);
    const participants = useSelector((state: RootState) => state.entities.participants);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleExitFullScreen = () => {
        dispatch(updateSettings({ fullScreen: false }))
    }

    useEffect(() => {
        const dbPlayerNames = fetchedPlayers?.map(p => p.name)
        const addedPlayers = participants.filter((val, i, arr) => {
            return (!!val.name || i === arr.length - 1) && val.name && dbPlayerNames && dbPlayerNames.indexOf(val.name) < 0;
        }).map(p => p.name);
        setNewPlayers(addedPlayers.length > 0);
    }, [fetchedPlayers, participants])

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: props.menuOpen,
                [classes.appBarHide]: fullScreen,
            })}
        >
            <Typography variant="h6" noWrap className={classes.title}>
                <Switch>
                    <Route exact path="/tournament/new">
                        <HeaderGeneric
                            title={t('Select Mode')}
                            backButton
                        />
                    </Route>
                    <Route exact path="/tournament-form/:tournamentType">
                        <HeaderGeneric
                            title={t('Tournament Settings')}
                            backButton
                            nextButton
                            nextButtonForm='tournament-form'
                        />
                    </Route>
                    <Route exact path="/tournament/player-type-select/:tournamentType">
                        <HeaderGeneric
                            title={t('Add Participants')}
                            backButton
                        />
                    </Route>
                    <Route exact path="/tournament/player-form/:tournamentType/:playerType">
                        <HeaderGeneric
                            title={t('Add Participants')}
                            backButton
                            shuffleParticipantsButton
                            importPlayersButton
                            nextButton
                            nextButtonText={newPlayers ? t('Submit New Players') : undefined}
                            nextButtonForm='player-form'
                        />
                    </Route>
                    <Route exact path="/tournament/player-form/:tournamentType/:playerType/:config">
                        <HeaderGeneric
                            title={t('Create Teams')}
                            backButton
                            nextButton
                            nextButtonForm='player-form'
                        />
                    </Route>
                    <Route exact path="/tournament/elimination-bracket">
                        <HeaderGeneric
                            title={t('Create Elimination Bracket')}
                            backButton
                            shuffleEliminationPlayersButton
                            nextButton
                            nextButtonForm='elimination-form'
                            thirdPlaceCheckbox
                        />
                    </Route>
                    <Route exact path="/elimination/:tournamentId">
                        <HeaderGeneric
                            showIcon
                            icon={<EliminationIcon width={36} height={36} fill='#404040' />}
                            title={t('Elimination')}
                            zoomSlider
                            fullScreenButton
                        />
                    </Route>
                    <Route exact path="/lms/:tournamentId">
                        <HeaderGeneric
                            showIcon
                            tournamentSidebar
                            icon={<LastManStandingIcon width={36} height={36} fill='#404040' />}
                            tournamentName
                            fullScreenButton
                        />
                    </Route>
                    <Route exact path="/elimination/:tournamentId/result">
                        <HeaderGeneric
                            backButton
                            title={t('Result')}
                            fullScreenButton
                            printButton
                        />
                    </Route>
                    <Route exact path="/lms/:tournamentId/result">
                        <HeaderGeneric
                            backButton
                            title={t('Result')}
                            fullScreenButton
                            printButton
                        />
                    </Route>
                    <Route exact path="/watch/:tournamentShareId">
                        <HeaderWatchTournament tournamentSidebar />
                    </Route>
                    <Route exact path="/watch/:tournamentShareId/result">
                        <HeaderWatchTournament backToTournament />
                    </Route>
                    <Route path="/">
                        <HeaderHome />
                    </Route>
                </Switch>
            </Typography>
            {fullScreen &&
                <div className={classes.exitFullScreenButtonContainer}>
                    <Tooltip title={`${t("Exit Full Screen")}`}>
                        <IconButton
                            className={classes.exitFullScreenButton}
                            onClick={handleExitFullScreen}
                            aria-label="exit-full-screen">
                            <FullscreenExitIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            }
        </AppBar>
    )
}

export default Header
