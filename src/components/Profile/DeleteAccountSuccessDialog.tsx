import React, { ReactElement, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useTranslation } from "react-i18next";
import { ActionStatus } from '../../types/main';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import profileStyles from './profileStyles';

interface Props {
    open: boolean;
    onClose: () => void;
}

const DeleteAccountSuccessDialog = (props: Props): ReactElement => {
    const userState = useSelector((state: RootState) => state.user);
    const classes = profileStyles();
    const { t } = useTranslation();

    return (
        <Dialog open={props.open} classes={{ paper: classes.dialog }}>
            <div className={classes.dialogHeader}>
                <HighlightOffIcon style={{ fontSize: 100 }} />
            </div>
            <DialogTitle id="form-dialog-title">
                {t('Delete Account')}
            </DialogTitle>
            {userState.requestDelete.status === ActionStatus.Success &&
                <DialogContent>
                    {t('request-delete-account-success-message')}
                </DialogContent>
            }
            {userState.requestDelete.status === ActionStatus.Failure &&
                <DialogContent>
                    <div>{t('An error occured')}</div>
                    <div>{userState.requestDelete.error}</div>
                </DialogContent>
            }
            <DialogActions>
                <Button onClick={props.onClose} color="primary" size='small' className={classes.dialogButton}>
                    {t('OK')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteAccountSuccessDialog
