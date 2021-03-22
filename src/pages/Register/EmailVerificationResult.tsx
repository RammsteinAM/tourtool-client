import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import registerStyles from './registerStyles';
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/actions'
import { registerActions } from '../../redux/register/actions'
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import { appName } from '../../utils/constants';
import mainStyles from '../../styles/mainStyles';

interface FormikValues {
    password: string;
    confirmPassword: string;
}

interface IError {
    password?: string;
    confirmPassword?: string;
}

interface Props {
}

const EmailVerificationResult = (props: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = registerStyles();
    const mainClasses = mainStyles();
    const history = useHistory();
    const registerState = useSelector((state: RootState) => state.register);
    const dispatch = useDispatch();
    const { token } = useParams<{ token: string }>();
    const { t } = useTranslation();

    useEffect(() => {
        if (registerState.verifyEmail.status === ActionStatus.Initial) {

            dispatch(registerActions.verifyEmail(token));
        }
    }, [registerState.verifyEmail.status]);

    const userData = registerState.verifyEmail.data;

    return (
        <div>
            <Dialog
                maxWidth={false}
                fullScreen={fullScreen}
                open
                classes={{
                    paper:
                        classes.paper
                }}
            >

                <Typography>
                    {t('Email Verification')}
                </Typography>
                {registerState.verifyEmail.status === ActionStatus.Request &&
                    <div className={mainClasses.progress}>
                        <CircularProgress />
                    </div>
                }
                {registerState.verifyEmail.status === ActionStatus.Success && userData?.email &&
                    <>
                        <div>
                            {userData?.displayName ? t('email-verification-success', {
                                displayName: userData.displayName,
                                email: userData?.email
                            }) :
                                t('email-verification-success-only-email', {
                                    email: userData?.email
                                })
                            }
                        </div>
                        <div>
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={() => { history.push('/login') }}
                            >
                                {t('Login')}
                            </Button>
                        </div>
                    </>

                }
                {registerState.verifyEmail.status === ActionStatus.Failure &&
                    <>
                        <div className={mainClasses.errorMessage}>{t(`ERROR_${registerState.verifyEmail.error}`)}</div>
                        <div>
                            <Button
                                type="button"
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={() => { history.push('/login') }}
                            >
                                {t('Go to Login Page')}
                            </Button>
                        </div>
                    </>
                }
            </Dialog>
        </div>
    );

}

export default EmailVerificationResult;