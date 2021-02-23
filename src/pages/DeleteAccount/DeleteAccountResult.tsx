import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../redux/auth/actions'
import { registerActions } from '../../redux/register/actions'
import { RootState } from '../../redux/store';
import { ActionStatus } from '../../types/main';
import deleteAccountStyles from './deleteAccountStyles';
import mainStyles from '../../styles/mainStyles';
import { userActions } from '../../redux/user/actions';

const DeleteAccountResult = () => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = deleteAccountStyles();
    const mainClasses = mainStyles();
    const history = useHistory();
    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const { token } = useParams<{ token: string }>();
    const { t } = useTranslation();

    useEffect(() => {
        if (userState.delete.status === ActionStatus.Initial) {

            dispatch(userActions.deleteUser(token));
        }
    }, [userState.delete.status]);

    return (
        <div>
            <Dialog
                maxWidth={false}
                fullScreen={fullScreen}
                open
                //className={classes.root}
                classes={{
                    paper:
                        classes.paper
                }}
            >

                {userState.delete.status === ActionStatus.Request &&
                    <div className={mainClasses.progress}>
                        <CircularProgress />
                    </div>
                }
                {userState.delete.status === ActionStatus.Success &&
                    <Typography>
                        {t('delete-account-success-message')}
                    </Typography>
                }
                {/* {registerState.verifyEmail.status === ActionStatus.Request &&
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
                        <div className={mainClasses.errorMessage}>{registerState.verifyEmail.error}</div>
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
                } */}
            </Dialog>
        </div>
    );

}

export default DeleteAccountResult;