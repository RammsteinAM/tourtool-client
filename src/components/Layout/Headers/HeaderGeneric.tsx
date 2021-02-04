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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { CssBaseline } from '@material-ui/core';
import headerStyles from './headerStyles';

interface Props {
    title: string;
    backButton?: boolean;
}

const HeaderGeneric = (props: Props) => {
    const classes = headerStyles();
    const history = useHistory();
    const [path, setPath] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        setPath(history.location.pathname)

    })

    const handleBackButton = () => {
        history.goBack()
    }

    return (
        <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
                {props.title}
            </Typography>
            {props.backButton && <IconButton className={classes.iconButton} aria-label="back" onClick={handleBackButton}>
                <ChevronLeftIcon />
            </IconButton>}
        </Toolbar>
    )
}

export default HeaderGeneric
