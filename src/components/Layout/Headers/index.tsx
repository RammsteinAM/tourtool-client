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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { CssBaseline } from '@material-ui/core';
import HeaderGeneric from './HeaderGeneric';
import HeaderHome from './HeaderHome';
import headerStyles from './headerStyles';
import HeaderTournamentForm from './HeaderTournamentForm';

interface Props {
    menuOpen: boolean,
}

const Header = (props: Props) => {
    const classes = headerStyles();
    const history = useHistory();
    const [path, setPath] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        setPath(history.location.pathname)

    })

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: props.menuOpen,
            })}
        >
            <Typography variant="h6" noWrap className={classes.title}>
                <Switch>
                    <Route exact path="/new">
                        <HeaderGeneric title={t('Select Mode')} />
                    </Route>
                    <Route exact path="/tournament-form/:tournamentType">
                        <HeaderGeneric
                            title={t('Tournament Settings')}
                            nextButton
                            nextButtonForm='tournament-form'
                        />
                        {/* <HeaderTournamentForm /> */}
                    </Route>
                    <Route exact path="/tournament-player-type-select">
                        <HeaderGeneric title={t('Add Participants')} backButton />
                    </Route>
                    <Route exact path="/tournament-player-form/:playerType">
                        <HeaderGeneric
                            title={t('Add Participants')}
                            backButton
                            shufflePlayersButton
                            nextButton
                            nextButtonForm='player-form'
                        />
                        {/* <HeaderTournamentForm /> */}
                    </Route>
                    <Route exact path="/elimination">
                        <HeaderGeneric
                            title={t('Create Elimination Bracket')}
                            backButton
                            shufflePlayersButton
                            nextButton
                            nextButtonForm='elimination-form'
                        />
                        {/* <HeaderTournamentForm /> */}
                    </Route>
                    <Route path="/">
                        <HeaderHome />
                    </Route>
                </Switch>
            </Typography>
        </AppBar>
    )
}

export default Header
