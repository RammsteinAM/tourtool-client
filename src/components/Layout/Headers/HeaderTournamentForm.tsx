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
import { useFormikContext } from 'formik';
import headerStyles from './headerStyles';

interface Props {
}

const Header = (props: Props) => {
    const [path, setPath] = useState('');
    const classes = headerStyles();
    const history = useHistory();
    //const { submitForm } = useFormikContext();
    const { t } = useTranslation();

    useEffect(() => {
        setPath(history.location.pathname)

    })

    const handleSubmit = () => {
        //submitForm();
      }

    return (
        <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
                {t('Manage Tournaments')}
            </Typography>
            <FormControl className={classes.search}/* className={clsx(classes.margin, classes.textField)} */>
                <Button
                form='tournament-form'
                    type="submit"
                    variant="contained"
                    color="secondary"
                    //disabled={submitting}
                    //className={classes.button}
                    //onClick={handleSubmit}
                >
                    {t('Next')}
                </Button>
            </FormControl>
        </Toolbar>
    )
}

export default Header
