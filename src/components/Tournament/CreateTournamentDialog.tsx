import React, { ReactElement, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { useTranslation } from "react-i18next";
import createTournamentDialogStyles from './createTournamentDialogStyles';
interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent, name: string) => void;
}

const CreateTournamentDialog = ({ open, onClose, onSubmit }: Props): ReactElement => {
    const [tournamentNameLabel, setTournamentNameLabel] = useState<string>();
    const [tournamentName, setTournamentName] = useState<string>('');
    const classes = createTournamentDialogStyles();
    const { t } = useTranslation();

    const handleTournamentNameChange = (e: React.ChangeEvent<{ value: string }>) => {
        setTournamentName(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        onSubmit(e, tournamentName);
    }

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.createTournamentDialog }}>
            <div className={classes.submitDialogHeader}>
                <PlayCircleFilledIcon style={{ fontSize: 100 }} />
            </div>
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">
                    {t('That is one good-looking Tournament!')}
                </DialogTitle>
                <DialogContent>
                    {t('Do you want to give it a name?')}
                </DialogContent>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={tournamentName}
                        margin="dense"
                        id="name"
                        onChange={handleTournamentNameChange}
                        onFocus={() => { setTournamentNameLabel(t('Tournament Name')) }}
                        onBlur={() => { !tournamentName && setTournamentNameLabel(new Date().toLocaleDateString()) }}
                        label={tournamentNameLabel || t('Tournament Name')}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="default" size='small' className={classes.submitDialogButton}>
                        {t('Cancel')}
                    </Button>
                    <Button onClick={onClose} color="default" size='small' type='submit' className={classes.submitDialogButton}>
                        {t('Start Tournament')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CreateTournamentDialog
