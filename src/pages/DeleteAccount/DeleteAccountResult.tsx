import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
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
            </Dialog>
        </div>
    );

}

export default DeleteAccountResult;