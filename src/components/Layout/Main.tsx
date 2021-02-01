import React, { ReactElement } from 'react'
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
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
import { CssBaseline } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import layoutStyles from './layoutStyles';

interface Props {
    children: ReactElement,
    menuOpen: boolean,
    backdropVisible: boolean,
    backdropCallback: (e: React.MouseEvent) => void
}

const Main = (props: Props) => {
    const classes = layoutStyles();
    const { t } = useTranslation();
    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: props.menuOpen,
                })}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        {t('Manage Tournaments')}
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
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
            <Backdrop open={props.backdropVisible} onClick={props.backdropCallback} className={classes.backdrop} />
        </>
    )
}

export default Main
