import React from 'react'
import { useTranslation } from "react-i18next";
import { Nullable } from '../../../types/main';
import EnterScoreSelector from './EnterScoreSelector';
import clsx from 'clsx';
import selectWinnerStyles from './selectWinnerStyles';

interface Props {
    score1: Nullable<number>;
    score2: Nullable<number>;
    onWinnerSelect1: () => void;
    onTieSelect: () => void;
    onWinnerSelect2: () => void;
    disallowTie?: boolean;
    player1Name: string;
    player2Name: string;
}

const SelectWinnerConainer = ({ score1, score2, onWinnerSelect1, onTieSelect, onWinnerSelect2, disallowTie, player1Name, player2Name }: Props) => {
    const classes = selectWinnerStyles();
    const { t } = useTranslation();

    const handleWinnerSelect1 = (e: React.MouseEvent) => {
        onWinnerSelect1();
    }

    return (
        <div className={classes.matchContainer}>
            <div onClick={handleWinnerSelect1} className={classes.winnerSelectButton}>
                <div className={clsx(classes.playerName, {
                    [classes.winnerSelected]: (score1 === 1 && score2 === 0),
                })}>{player1Name}</div>
            </div>
            <div onClick={disallowTie ? undefined : onTieSelect} className={clsx(classes.winnerSelectButton, {
                [classes.tieDisabled]: disallowTie,
            })}>
                <div className={clsx(classes.playerName, {
                    [classes.winnerSelected]: (score1 === 1 && score2 === 1),
                })}>{t('Draw')}</div>
            </div>
            <div onClick={onWinnerSelect2} className={classes.winnerSelectButton}>
                <div className={clsx(classes.playerName, {
                    [classes.winnerSelected]: (score1 === 0 && score2 === 1),
                })}>{player2Name}</div>
            </div>
        </div>
    )
}

export default SelectWinnerConainer
