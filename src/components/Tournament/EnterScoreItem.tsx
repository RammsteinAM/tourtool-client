import React from 'react'
import enterScoreDialogStyles from './enterScoresStyles';

interface Props {
    scoreNumber: number;
    onSelect: (score: number) => void;
    style: React.CSSProperties;
    disabled?: boolean;
}

const EnterScoreItem = ({ scoreNumber, onSelect, style, disabled }: Props) => {
    const classes = enterScoreDialogStyles();
    const handleScoreSelect = () => {
        onSelect(scoreNumber);
    }

    return (
        <div
            className={`${classes.scoreItem}${disabled ? ' disabled' : ''}`}
            style={scoreNumber < 100 ? style : { ...style, fontSize: '12px' }}
            onClick={handleScoreSelect}
        >
            {scoreNumber}
        </div>
    )
}

export default EnterScoreItem
