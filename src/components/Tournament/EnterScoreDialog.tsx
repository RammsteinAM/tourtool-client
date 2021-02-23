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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import enterScoreDialogStyles from './enterScoreDialogStyles';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (score1: number, score2: number) => void;
    player1?: string;
    player2?: string;
}

interface ScoreProps {
    scoreNumber: number;
    selectedNumber?: number;
    left: number;
    onScoreSelect: (score: number) => void;
}

const Score = ({ scoreNumber, left, selectedNumber, onScoreSelect }: ScoreProps) => {
    const classes = enterScoreDialogStyles();
    const handleScoreSelect = () => {
        onScoreSelect(scoreNumber);
    }

    return (
        <>
            <div className={classes.scoreItem} style={{ left }} onClick={handleScoreSelect}>
                {scoreNumber}

            </div>
            {selectedNumber === scoreNumber &&
                <div className={classes.scoreItemSelected}  style={{ left: `${left+6}px` }} ></div>
            }
        </>
    )
}

const EnterScoreDialog = ({ open, onClose, onConfirm, player1, player2 }: Props) => {
    const classes = enterScoreDialogStyles();
    const [score1, setScore1] = useState<number>();
    const [score2, setScore2] = useState<number>();
    const entityState = useSelector((state: RootState) => state.entities);
    const { t } = useTranslation();
    const numberOfGoals = entityState.tournament.numberOfGoals || 7;
    const handleConfirm = (e: React.FormEvent) => {
        if (score1 !== undefined && score2 !== undefined) {
            onConfirm(score1, score2);
        }
    }

    const handleLScoreSelectLeft = (score: number) => {
        setScore1(score);
        if (score2 === undefined && score < numberOfGoals) {
            setScore2(numberOfGoals);
        }
    }

    const handleLScoreSelectRight = (score: number) => {
        setScore2(score);
        if (score1 === undefined && score < numberOfGoals) {
            setScore1(numberOfGoals);
        }
    }

    const renderPointsLeft = () => {
        const points: JSX.Element[] = [];
        const maxPoint = numberOfGoals + 5;
        let minPoint = numberOfGoals - 14 < 0 ? 0 : numberOfGoals - 14;
        do {
            points.push(
                <Score
                    scoreNumber={minPoint}
                    left={(numberOfGoals + minPoint - 7) * 34}
                    onScoreSelect={handleLScoreSelectLeft}
                    selectedNumber={score1}
                />
            )
            minPoint++;
        } while (minPoint <= maxPoint);

        return points;
    }

    const handlePlusButtonLeft = () => {

    }

    const handleMinusButtonLeft = () => {

    }

    const renderPointsRight = () => {
        const points: JSX.Element[] = [];
        const maxPoint = numberOfGoals + 5;
        let minPoint = numberOfGoals - 14 < 0 ? 0 : numberOfGoals - 14;
        do {
            points.push(
                <Score
                    scoreNumber={minPoint}
                    left={(numberOfGoals + minPoint - 7) * 34}
                    onScoreSelect={handleLScoreSelectRight}
                    selectedNumber={score2}
                />
            )
            minPoint++;
        } while (minPoint <= maxPoint);

        return points;
    }

    const handlePlusButtonRight = () => {

    }

    const handleMinusButtonRight = () => {

    }

    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
            <div className={classes.dialogHeader}>
                <div className={classes.dialogHeaderPlayer}>{player1}</div>
                <div className={classes.dialogHeaderPlayer}>{player2}</div>
            </div>

            <div className={classes.pointsContainer}>
                <div className={classes.pointsInputContainer}>
                    {
                        <div>
                            <IconButton aria-label="close" onClick={handleMinusButtonLeft} className={classes.iconButtons}>
                                <RemoveIcon fontSize='small' />
                            </IconButton>
                        </div>
                    }
                    <div className={classes.pointsInput}>
                        {renderPointsLeft()}
                    </div>
                    <div>
                        <IconButton aria-label="close" onClick={handleMinusButtonLeft} className={classes.iconButtons}>
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>
                <div className={classes.pointsMiddle}>- : -</div>
                <div className={classes.pointsInputContainer}>
                    {
                        <div>
                            <IconButton aria-label="close" onClick={handleMinusButtonRight} className={classes.iconButtons}>
                                <RemoveIcon fontSize='small' />
                            </IconButton>
                        </div>
                    }
                    <div className={classes.pointsInput}>
                        {renderPointsRight()}
                    </div>
                    <div>
                        <IconButton aria-label="close" onClick={handleMinusButtonRight} className={classes.iconButtons}>
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>
            </div>


            <DialogActions className={classes.dialogFooter}>
                <Button onClick={onClose} color="default" size='small' className={classes.dialogButton}>
                    {t('Cancel')}
                </Button>
                <Button onClick={handleConfirm} color="primary" size='small' type='submit' className={`${classes.dialogButton} primary`}>
                    {t('Confirm')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EnterScoreDialog
