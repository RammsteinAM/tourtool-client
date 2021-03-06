import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import enterScoreDialogStyles from './enterScoresStyles';
import { EliminationGames, Games, StateScore } from '../../../types/entities';
import EnterScoreContent from './EnterScoreContent';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (score1: StateScore, score2: StateScore) => void;
    player1?: string | [string, string];
    player2?: string | [string, string];    
    games: Games | EliminationGames;
    gameKey: string;
    visibleScores?: number;
}

const EnterScoreDialog = ({ open, onClose, onConfirm, player1, player2, gameKey, games, visibleScores }: Props) => {
    const classes = enterScoreDialogStyles();
    const { t } = useTranslation();

    const handleClose = () => {
        // setScore1({});
        // setScore2({});
        onClose()
    }


    return (
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
            <div className={classes.dialogHeader}>
                <div className={classes.dialogHeaderPlayer}>{player1}</div>
                <div className={classes.dialogHeaderPlayer}>{player2}</div>
            </div>
            <EnterScoreContent
                onClose={onClose}
                onConfirm={onConfirm}
                gameKey={gameKey}
                games={games}
                visibleScores={visibleScores}
            />
        </Dialog>
    )
}

export default EnterScoreDialog
