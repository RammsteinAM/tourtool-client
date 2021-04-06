import React, { ReactElement, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Dialog as MUIDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { useTranslation } from "react-i18next";
import WarningIcon from '@material-ui/icons/Warning';
import dialogStyles from './dialogStyles';
interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    titleText: string;
    bodyText: string;
    /** @description Default value is `Confirm`. */
    confirmButtonText?: string;    
    /** @description Default value is `Cancel`. */
    cancelButtonText?: string;
    dialogType: 'warning' | 'error' | 'confirm'
}

const Dialog = ({ open, onClose, onConfirm, titleText, bodyText, confirmButtonText, cancelButtonText, dialogType }: Props): ReactElement => {
    const classes = dialogStyles();
    const { t } = useTranslation();

    const renderHeader = () => {
        switch (dialogType) {
            case 'warning':
                return (
                    <div
                        className={classes.dialogHeader}
                        style={{ backgroundImage: 'linear-gradient(-180deg,#e89e67,#e16f3d)' }}
                    >
                        <WarningIcon style={{ fontSize: 100 }} />
                    </div>
                );
            default:
                break;
        }
    }

    return (
        <MUIDialog open={open} onClose={onClose} classes={{ paper: classes.createTournamentDialog }}>
            {renderHeader()}
            <DialogTitle>
                {titleText || t('Confirmation')}
            </DialogTitle>
            <DialogContent>
                {bodyText || t('Please Confirm Your Action.')}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="default" size='small' className={classes.dialogButton}>
                    {cancelButtonText || t('Cancel')}
                </Button>
                <Button onClick={onConfirm} color="default" size='small' className={classes.dialogButton}>
                    {confirmButtonText || t('Confirm')}
                </Button>
            </DialogActions>
        </MUIDialog>
    )
}

export default Dialog
