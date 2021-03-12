import React from 'react';
import { useTranslation } from "react-i18next";
import gameListRowStyles from './gameListRowStyles';

interface Props {
    scoresOpen: boolean;
    score1?: number;
    score2?: number;
}

const GameListEnterScoreButton = ({ scoresOpen, score1, score2 }: Props) => {
    const classes = gameListRowStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.enterScoreButton} style={scoresOpen ? { backgroundColor: '#333333' } : {}}>
            {scoresOpen || typeof score1 !== 'number' || typeof score2 !== 'number' ?
                <div className={classes.enterResultButton}>
                    {t('Enter Result')}
                </div> :
                <div className={classes.enterScoreButtonScoreDisplay}>
                    <span className={score1 > score2 || score1 === score2 ? classes.winningScoreLeft : ''}>{score1}</span>
                    <span> : </span>
                    <span className={score1 < score2 || score1 === score2 ? classes.winningScoreRight : ''}>{score2}</span>
                </div>
            }
        </div>
    )
}

export default GameListEnterScoreButton
