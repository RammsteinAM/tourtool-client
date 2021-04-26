import React, { useRef } from 'react'
import Dialog from '@material-ui/core/Dialog';
import enterScoreDialogStyles from './enterScoresStyles';
import { EliminationGames, FetchedGameData, Games, StateScore } from '../../../types/entities';
import EnterScoreContent from './EnterScoreContent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useParams } from 'react-router-dom';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: (score1: StateScore, score2: StateScore) => void;
    player1: string;
    player2: string;
    game: FetchedGameData;
    gameKey: string;
    visibleScores?: number;
}

const EnterScoreDialog = (props: Props) => {
    const enterScoreContentRef = useRef<any>(null);
    const fetchedTournamentsData = useSelector((state: RootState) => state.entities.fetchedTournaments.data);
    const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
    const tournamentId = parseInt(tournamentIdString, 10);
    const tournamentData = fetchedTournamentsData[tournamentId];
    const classes = enterScoreDialogStyles();

    if (!tournamentData) {
        return null;
    }
    return (
        <Dialog open={props.open} onClose={props.onClose} classes={{ paper: classes.dialog }}>
            {(tournamentData.numberOfGoals && tournamentData.numberOfGoals > 0) ? <div className={classes.dialogHeader}>
                <div className={classes.dialogHeaderPlayer}>{props.player1}</div>
                <div className={classes.dialogHeaderPlayer}>{props.player2}</div>
            </div> : null}
            <EnterScoreContent
                forwardedRef={enterScoreContentRef}
                onClose={props.onClose}
                onConfirm={props.onConfirm}
                gameKey={props.gameKey}
                game={props.game}
                playerNames={{ left: props.player1, right: props.player2 }}
                tournament={fetchedTournamentsData[tournamentId]}
            />
        </Dialog>
    )
}

export default EnterScoreDialog
