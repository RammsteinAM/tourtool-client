import React, { ReactElement, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { StateParticipants, StatePlayers } from '../../types/entities';
import { updateParticipants } from '../../redux/tournamentEntities/actions';
import toast from '../IndependentSnackbar';
import importParticipantsDialogStyles from './importParticipantsDialogStyles';

const initialPlayer = { name: '', category: null };
interface Props {
    open: boolean;
    onClose: () => void;
    //onSubmit: (e: React.FormEvent, name: string) => void;
}

const ImportParticipantsDialog = ({ open, onClose }: Props): ReactElement => {
    const [participants, setParticipants] = useState<string>('');
    const dispatch = useDispatch();
    const classes = importParticipantsDialogStyles();

    const { t } = useTranslation();

    const handleParticipantsChange = (e: React.ChangeEvent<{ value: string }>) => {
        setParticipants(e.target.value)
    }

    const handleClose = () => {
        setParticipants('');
        onClose();
    }

    const handleImportKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            if (e.ctrlKey || e.shiftKey) {
                e.preventDefault();
                handleImport();
            }
        }
    }

    const handleImport = () => {
        const participants = generateParticipants();
        const duplicates = findDuplicates(participants);
        if (duplicates.length === 1) {
            toast.warning(t('player-import-form-duplicate-name', { name: duplicates[0] }));
        }
        else if (duplicates.length > 1) {
            let duplicateNames = '';
            for (let i = 0; i < duplicates.length; i++) {
                duplicateNames += duplicates[i]
                if (i < duplicates.length - 1) duplicateNames += ', '
            }
            toast.warning(t('player-import-form-duplicate-names', { names: duplicateNames }));
        }
        else {
            submitPlayersToStore(participants.filter(x => !!x));
            handleClose();
        }
    }

    const generateParticipants = (): string[] => {
        let normalizedParticipants = participants.replace(/\s*;\s*/g, ";").replace(/\s*,\s*/g, ",").replace(/\s*\n\s*/g, "\n");
        return normalizedParticipants.split(/[,;\n]+/);
    }

    const findDuplicates = (arr: string[]) => {
        const duplicates = arr.filter((e, i, a) => !!e && a.indexOf(e) !== i);
        const uniqueDuplicates = [...new Set(duplicates)];
        return uniqueDuplicates;
    }

    const submitPlayersToStore = (participants: string[]) => {
        const storeParticipants: StateParticipants = participants
            .map((name) => {
                return { name, category: null }
            })

        dispatch(updateParticipants(storeParticipants));
    }

    return (
        <Dialog open={open} classes={{ paper: classes.importParticipantsDialog }}>
            <div className={classes.importDialogHeader}>
                <DialogTitle>
                    {t('Import Participants')}
                </DialogTitle>
                <IconButton aria-label="close" onClick={handleClose} className={classes.dialogHeaderIcon}>
                    <CloseIcon />
                </IconButton>
            </div>


            <DialogContent>
                <div className={classes.importParticipantsDescription}>
                    {t('import-participants-dialog-description')}
                </div>
                <InputBase
                    className={classes.importParticipantsTextField}
                    autoFocus
                    multiline
                    spellCheck={false}
                    inputProps={{ 'data-gramm': 'false' }}
                    rows={26}
                    value={participants}
                    onChange={handleParticipantsChange}
                    onKeyDown={handleImportKeyDown}
                    type='text'
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default" size='small' className={classes.submitDialogButton}>
                    {t('Cancel')}
                </Button>
                <Button onClick={handleImport} color="default" size='small' className={classes.submitDialogButton}>
                    {t('Import')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ImportParticipantsDialog
