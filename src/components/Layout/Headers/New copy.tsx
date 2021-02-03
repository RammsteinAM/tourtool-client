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
import headerStyles from './headerStyles';

interface Props {
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
            <Toolbar>
                <Typography variant="h6" noWrap className={classes.title}>
                    {t('Select Mode')}
                </Typography>
                <FormControl className={classes.search}/* className={clsx(classes.margin, classes.textField)} */>
                    <Input
                        id="standard-adornment-password"
                        type='text'
                        //value={values.password}
                        //onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="hide search field"
                                // onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Toolbar>
    )
}

export default Header
