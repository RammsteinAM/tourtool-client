import React from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import homeStyles from './homeStyles';
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
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
interface Props {
}

const Home = (props: Props) => {
    const classes = homeStyles();
    const authState = useSelector((state: RootState) => state.auth);
    const loggedIn = authState.status === ActionStatus.Success;
    const history = useHistory();
    const { t } = useTranslation();

    const handleCreateTournament = () => {
        history.push(authState.status === ActionStatus.Success ? '/tournament/new' : '/login');
    }

    return (
        <div className={classes.root}>
            <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleCreateTournament}
            >
                {loggedIn ? t('Create New Tournament') : t('Login to Create a Tournament')}
            </Button>
        </div>
    )
}

export default Home
