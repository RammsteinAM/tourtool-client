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
    onConfirm: () => void;
}

const DeleteAccountDialog = ({ open, onClose, onConfirm }: Props): ReactElement => {
    const [error, setError] = useState<string>()
    const userState = useSelector((state: RootState) => state.user);
    const classes = profileStyles();
    const { t } = useTranslation();

    useEffect(() => {
        setError(userState.delete.error);
    }, [userState.delete.status]);

    const handleConfirm = (e: React.FormEvent) => {
        onConfirm();
    }

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
            <div className={classes.dialogHeader}>
                <HighlightOffIcon style={{ fontSize: 100 }} />
            </div>
            <DialogTitle id="form-dialog-title">
                {t('Delete Account')}
            </DialogTitle>
            <DialogContent>
                {t('delete-account-confirmation-message')}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} color="default" size='small' type='submit' className={classes.dialogButton}>
                    {t('Delete Account')}
                </Button>
                <Button onClick={onClose} color="primary" size='small' className={classes.dialogButton}>
                    {t('Cancel')}
                </Button>
            </DialogActions>
            {error && <div color='error'>{error}</div>}
        </Dialog>
    )
}

export default DeleteAccountDialog
