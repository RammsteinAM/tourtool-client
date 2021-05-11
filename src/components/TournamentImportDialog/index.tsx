import React, { useCallback } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { entityActions } from "../../redux/tournamentEntities/actions";
import { useDispatch } from "react-redux";
import toast from "../IndependentSnackbar";
import tournamentImportDialogStyles from "./tournamentImportDialogStyles";

interface Props {
  open: boolean,
  onClose: () => void,
}

const TournamentImportDialog = (props: Props) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const classes = tournamentImportDialogStyles();

  const handleDropAccepted = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const fr = new FileReader();
    try {
      fr.onload = (e: ProgressEvent<EventTarget & { result: any }>) => {
        const result = e?.target?.result && JSON.parse(e.target.result);
        dispatch(entityActions.importTournament(result));
        props.onClose();
      }
      fr.readAsText(file);
    } catch (error) {
      toast.error(t('Error reading file'));
    }
  }, [])

  const handleDropRejected = () => {
    toast.error(t('Unsupported file type'));
  }

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    accept: 'application/json',
    multiple: false,
    maxFiles: 1,
    maxSize: 1000000,
    onDropRejected: handleDropRejected,
    onDropAccepted: handleDropAccepted
  })

  return (
    <Dialog open={props.open} onClose={props.onClose} classes={{ paper: classes.dialog }}>
      <DialogContent className={classes.dialogContent}>
        <div {...getRootProps()} className={classes.container}>
          <input {...getInputProps()} />
          {
            isDragAccept ?
              <div className={classes.content}>
                <AddCircleIcon style={{ fontSize: 50 }} />
                <p>{t('drop-file-text-drag-active')}</p>
              </div> :
              <div className={classes.content}>
                <AddCircleOutlineIcon style={{ fontSize: 50 }} />
                <p>{t('drop-file-text')}</p>
              </div>
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="default" size='small' className={classes.dialogButton}>
          {t('Close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TournamentImportDialog;