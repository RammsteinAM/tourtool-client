import React, { useRef } from 'react'
import Dialog from '@material-ui/core/Dialog';
import enterScoreDialogStyles from './enterScoresStyles';
import { EliminationGames, Games, StateScore } from '../../../types/entities';
import EnterScoreContent from './EnterScoreContent';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (score1: StateScore, score2: StateScore) => void;
    player1: string | [string, string];
    player2: string | [string, string];
    games: Games | EliminationGames;
    gameKey: string;
    visibleScores?: number;
}

const EnterScoreDialog = (props: Props) => {    
    const enterScoreContentRef = useRef<any>(null);
    const classes = enterScoreDialogStyles();

    return (
        <Dialog open={props.open} onClose={props.onClose} classes={{ paper: classes.dialog }}>
            <div className={classes.dialogHeader}>
                <div className={classes.dialogHeaderPlayer}>{props.player1}</div>
                <div className={classes.dialogHeaderPlayer}>{props.player2}</div>
            </div>
            <EnterScoreContent
                forwardedRef={enterScoreContentRef}
                onClose={props.onClose}
                onConfirm={props.onConfirm}
                gameKey={props.gameKey}
                games={props.games}
                visibleScores={props.visibleScores}
            />
        </Dialog>
    )
}

export default EnterScoreDialog
