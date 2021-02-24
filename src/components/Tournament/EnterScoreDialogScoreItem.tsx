import React from 'react'
import enterScoreDialogStyles from './enterScoreDialogStyles';

interface Props {
    scoreNumber: number;
    onSelect: (score: number) => void;
    style: { left?: string, right?: string, transitionDelay: string};
    disabled?: boolean;
}

const EnterScoreDialogScoreItem = ({ scoreNumber, onSelect, style, disabled }: Props) => {
    const classes = enterScoreDialogStyles();
    const handleScoreSelect = () => {
        onSelect(scoreNumber);
    }

    return (
        <div id={`score-item-${scoreNumber}`} className={`${classes.scoreItem}${disabled ? ' disabled' : ''}`} style={style} onClick={handleScoreSelect}>
            {scoreNumber}
        </div>
    )
}

export default EnterScoreDialogScoreItem
