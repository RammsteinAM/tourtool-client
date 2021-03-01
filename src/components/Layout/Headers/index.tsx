import React from 'react';
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
import headerStyles from './headerStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { updateSettings } from '../../../redux/settings/actions';

interface Props {
    menuOpen: boolean,
}

const Header = (props: Props) => {
    const classes = headerStyles();
    const history = useHistory();
    const fullScreen = useSelector((state: RootState) => state.settings.fullScreen);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleExitFullScreen = () => {
        dispatch(updateSettings({ fullScreen: false }))
    }

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
                        {/* <HeaderTournamentForm /> */}
                    </Route>
                    <Route exact path="/tournament/player-type-select/:tournamentType">
                        <HeaderGeneric title={t('Add Participants')} backButton />
                    </Route>
                    <Route exact path="/tournament/:tournamentType/player-form/:playerType">
                        <HeaderGeneric
                            title={t('Add Participants')}
                            backButton
                            shuffleParticipantsButton
                            importPlayersButton
                            nextButton
                            nextButtonForm='player-form'
                        />
                    </Route>
                    <Route exact path="/tournament/:tournamentType/player-form/:playerType/:config">
                        <HeaderGeneric
                            title={t('Create Teams')}
                            backButton
                            nextButton
                            nextButtonForm='player-form'
                        />
                        {/* <HeaderTournamentForm /> */}
                    </Route>
                    <Route exact path="/elimination-bracket">
                        <HeaderGeneric
                            title={t('Create Elimination Bracket')}
                            backButton
                            shufflePlayersButton
                            nextButton
                            nextButtonForm='elimination-form'
                            thirdPlaceCheckbox
                        />
                        {/* <HeaderTournamentForm /> */}
                    </Route>
                    <Route exact path="/elimination">
                        <HeaderGeneric
                            title={t('Elimination')}
                            zoomSlider
                            fullScreenButton
                        />
                        {/* <HeaderTournamentForm /> */}
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
