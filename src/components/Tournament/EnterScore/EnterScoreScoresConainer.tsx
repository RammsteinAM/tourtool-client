import React from 'react'
import { useTranslation } from "react-i18next";
import { Nullable } from '../../../types/main';
import EnterScoreSelector from './EnterScoreSelector';
import enterScoreDialogStyles from './enterScoresStyles';

interface Props {
    score1: Nullable<number>;
    score2: Nullable<number>;
    onScoreSelect1: (score: number) => void;
    onScoreSelect2: (score: number) => void;
    visibleScores?: number;
    numberOfGoals: number;
    disallowTie?: boolean;
}

const EnterScoreScoresConainer = ({ score1, score2, onScoreSelect1, onScoreSelect2, disallowTie, numberOfGoals, visibleScores }: Props) => {
    const classes = enterScoreDialogStyles();
    const { t } = useTranslation();

    const handleScoreSelect1 = (score: number) => {
        if (disallowTie && score2 === score) return;
        onScoreSelect1(score);
    }

    const handleScoreSelect2 = (score: number) => {
        if (disallowTie && score1 === score) return;
        onScoreSelect2(score);
    }
debugger
    return (
        <div className={classes.pointsContainer}>
            <EnterScoreSelector
                selectedNumber={score1}
                onScoreSelect={handleScoreSelect1}
                disabledScore={disallowTie && typeof score2 === 'number' ? score2 : undefined}
                visibleScores={visibleScores}
                numberOfGoals={numberOfGoals}
            />
            <div className={classes.pointsMiddle}>
                <span>{typeof score1 === 'number' ? score1 : '-'} </span>
                <span> : </span>
                <span>{typeof score2 === 'number' ? score2 : '-'}</span>
            </div>
            <EnterScoreSelector
                selectedNumber={score2}
                onScoreSelect={handleScoreSelect2}
                disabledScore={disallowTie && typeof score1 === 'number' ? score1 : undefined}
                visibleScores={visibleScores}
                numberOfGoals={numberOfGoals}
                mirrored
            />
        </div>
    )
}

export default EnterScoreScoresConainer
