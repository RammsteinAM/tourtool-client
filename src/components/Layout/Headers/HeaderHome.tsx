import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ActionStatus } from '../../../types/main';
import headerStyles from './headerStyles';

interface Props {
}

const Header = (props: Props) => {
    const classes = headerStyles();
    const history = useHistory();
    const [path, setPath] = useState('');
    const authState = useSelector((state: RootState) => state.auth);
    const loggedIn = authState.status === ActionStatus.Success;
    const { t } = useTranslation();

    useEffect(() => {
        setPath(history.location.pathname)

    })

    return (
        <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
                {t('Manage Tournaments')}
            </Typography>
            <FormControl className={classes.search}>
                <Input
                    id="standard-adornment-password"
                    type='text'
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="hide search field"
                            >
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {loggedIn && <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => { history.push('/tournament/new') }}
            >
                {t('Create New Tournament')}
            </Button>}
        </Toolbar>
    )
}

export default Header
