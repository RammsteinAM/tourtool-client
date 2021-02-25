import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { Nullable } from '../../types/main';
import EnterScoreDialogScoreSelectorLTR from './EnterScoreDialogScoreSelectorLTR';
import EnterScoreDialogScoreSelectorRTL from './EnterScoreDialogScoreSelectorRTL';
import enterScoreDialogStyles from './enterScoreDialogStyles';

interface Props {
    score1: Nullable<number>;
    score2: Nullable<number>;
    onScoreSelect1: (score: number) => void;
    onScoreSelect2: (score: number) => void;
    disallowTie?: boolean;
}

const EnterScoreDialogScoresConainer = ({ score1, score2, onScoreSelect1, onScoreSelect2, disallowTie }: Props) => {
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
 
    return (
        <div className={classes.pointsContainer}>
            <EnterScoreDialogScoreSelectorLTR
                selectedNumber={score1}
                onScoreSelect={handleScoreSelect1}
                disabledScore={disallowTie && typeof score2 === 'number' ? score2 : undefined}
            />
            <div className={classes.pointsMiddle}>{score1 !== null ? score1 : '-'} : {score2 !== null ? score2 : '-'}</div>
            <EnterScoreDialogScoreSelectorRTL
                selectedNumber={score2}
                onScoreSelect={handleScoreSelect2}
                disabledScore={disallowTie && typeof score1 === 'number' ? score1 : undefined}
            />
        </div>
    )
}

export default EnterScoreDialogScoresConainer
