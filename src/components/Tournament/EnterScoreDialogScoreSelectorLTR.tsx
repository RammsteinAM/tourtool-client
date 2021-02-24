import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { ActionStatus, Nullable } from '../../types/main';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import enterScoreDialogStyles from './enterScoreDialogStyles';
import EnterScoreDialogScoreItem from './EnterScoreDialogScoreItem';

interface PreviousHookValue {
    selection: number;
    leftShift: number;
}

function usePrevious(value: any) {
    const ref = useRef<PreviousHookValue>();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

interface Props {
    selectedNumber?: Nullable<number>;
    onScoreSelect: (score: number) => void;
    disabledScore?: number;
}

const EnterScoreDialogScoreSelectorLTR = ({ selectedNumber, onScoreSelect, disabledScore }: Props) => {
    const [leftShift, setLeftShift] = useState<number>(0);
    const [plusMinusAction, setPlusMinusAction] = useState<'plus' | 'minus' | null>();
    const entityState = useSelector((state: RootState) => state.entities);
    const prevState = usePrevious({ selection: selectedNumber, leftShift })
    const classes = enterScoreDialogStyles();
    const { t } = useTranslation();
    const numberOfGoals = entityState.tournament.numberOfGoals || 7;
    const firstVisiblePoint = numberOfGoals < 14 ? leftShift : numberOfGoals - 13 + leftShift;
    let leftStep = numberOfGoals < 9 ? 0 : -1 * (numberOfGoals > 13 ? 5 : numberOfGoals - 8);

    useEffect(() => {
        selectedNumber && setLeftShift(((Math.floor(selectedNumber / 4) || 1) - 1) * 4);
    }, [])

    const handleScoreSelect = (score: number) => {
        setPlusMinusAction(null);
        onScoreSelect(score);
    }

    const handlePlusButton = () => {
        setPlusMinusAction('plus');
        setLeftShift(leftShift + 4);
    }

    const handleMinusButton = () => {
        setPlusMinusAction('minus');
        leftShift - 4 <= 0 ? setLeftShift(0) : setLeftShift(leftShift - 4);
    }

    const getTransactionDelays = (key?: number): { score: number, selectionCircle: number } => {
        let score = 0, selectionCircle = 0;
        switch (plusMinusAction) {
            case 'plus':
                if (key !== undefined) {
                    score = (key - firstVisiblePoint) * 30;
                }
                if (selectedNumber !== undefined && selectedNumber !== null) {
                    selectionCircle = (selectedNumber - firstVisiblePoint) * 30;
                }
                break;
            case 'minus':
                if (key !== undefined) {
                    score = (firstVisiblePoint + 8 - key) * 30;
                }
                if (selectedNumber !== undefined && selectedNumber !== null) {
                    selectionCircle = (firstVisiblePoint + 8 - selectedNumber) * 30;
                }
                break;
        }
        if (prevState !== undefined && (prevState.selection < prevState.leftShift - 4 || prevState.selection > prevState.leftShift + 12)) {
            selectionCircle = 0;
        }

        return { score, selectionCircle };
    }

    return (
        <>
            <div className={classes.pointsInputContainer}>
                <div style={leftShift <= 0 ? { visibility: 'hidden' } : {}}>
                    <IconButton aria-label="close" onClick={handleMinusButton} className={classes.iconButtons}>
                        <RemoveIcon fontSize='small' />
                    </IconButton>
                </div>
                <div className={classes.pointsInput}>
                    {
                        [...Array(numberOfGoals + 10 + leftShift).keys()].map(key => {
                            const left = (leftStep + key) * 34 - 2;
                            const leftShiftPx = leftShift * 34;
                            return (
                                <EnterScoreDialogScoreItem
                                    key={key}
                                    scoreNumber={key}
                                    onSelect={handleScoreSelect}
                                    style={{ left: `${left - leftShiftPx}px`, transitionDelay: `${getTransactionDelays(key).score}ms` }}
                                    disabled={disabledScore === key}
                                />
                            )
                        })
                    }
                    {selectedNumber !== null && selectedNumber !== undefined &&
                        <div className={classes.scoreItemSelected} style={{ left: `${(selectedNumber - leftShift) * 34 + 4}px`, transitionDelay: `${getTransactionDelays().selectionCircle}ms` }} ></div>
                    }
                </div>
                <div>
                    <IconButton aria-label="close" onClick={handlePlusButton} className={classes.iconButtons}>
                        <AddIcon fontSize='small' />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default EnterScoreDialogScoreSelectorLTR
