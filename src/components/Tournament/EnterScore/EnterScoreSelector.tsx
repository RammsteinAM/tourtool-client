import React, { useEffect, useRef, useState } from 'react'
import { Nullable } from '../../../types/main';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import EnterScoreItem from './EnterScoreItem';
import enterScoresStyles from './enterScoresStyles';

interface PreviousHookValue {
    selection: number;
    lastVisibleScore: number;
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
    numberOfGoals: number;
    disabledScore?: number;
    visibleScores?: number;
    mirrored?: boolean;
}

const EnterScoreSelector = ({ selectedNumber, onScoreSelect, disabledScore, mirrored, numberOfGoals, visibleScores = 9 }: Props) => {
    const [scoreShift, setScoreShift] = useState<number>(0);
    const [initiallyLastVisibleScore, setInitiallyLastVisibleScore] = useState<number>(visibleScores);
    const [isInitial, setIsInitial] = useState<boolean>(true);
    const [plusMinusAction, setPlusMinusAction] = useState<'plus' | 'minus' | null>();
    const classes = enterScoresStyles();
    const shiftStep = Math.floor(visibleScores / 2);
    const lastVisibleScore = initiallyLastVisibleScore + scoreShift;
    const hiddenStartingScores = lastVisibleScore - visibleScores + 1;
    const numberOfRenderedScores = lastVisibleScore + shiftStep + 1;

    const prevState = usePrevious({ selection: selectedNumber, lastVisibleScore })

    useEffect(() => {

        if (typeof selectedNumber !== 'number') {
            if (numberOfGoals < visibleScores) { // normally shouldn't be a case
                setInitiallyLastVisibleScore(visibleScores - 1);
                return;
            }
            setInitiallyLastVisibleScore(numberOfGoals);
            return;
        }
        if (lastVisibleScore - selectedNumber >= visibleScores || lastVisibleScore - selectedNumber < 0){
            setScoreShift(0);
        }
        if (lastVisibleScore - selectedNumber < visibleScores && lastVisibleScore - selectedNumber >= 0) {
            return;
        }
        if (selectedNumber < numberOfGoals && selectedNumber > numberOfGoals - visibleScores) {
            setInitiallyLastVisibleScore(numberOfGoals);
            return;
        }
        if (selectedNumber <= Math.floor(visibleScores / 2)) {
            setInitiallyLastVisibleScore(visibleScores - 1);
            return;
        }
        if (selectedNumber <= numberOfGoals - visibleScores) {
            setInitiallyLastVisibleScore(selectedNumber + Math.floor(visibleScores / 2));
            return;
        }
        setInitiallyLastVisibleScore(selectedNumber);

    }, [selectedNumber])

    const handleScoreSelect = (score: number) => {
        setPlusMinusAction(null);
        onScoreSelect(score);
        isInitial && setIsInitial(false);
    }

    const handlePlusButton = () => {
        setPlusMinusAction('plus');
        setScoreShift(scoreShift + shiftStep);
        isInitial && setIsInitial(false);
    }

    const handleMinusButton = () => {
        setPlusMinusAction('minus');
        hiddenStartingScores <= shiftStep ? setScoreShift(scoreShift - hiddenStartingScores) : setScoreShift(scoreShift - shiftStep);
        isInitial && setIsInitial(false);
    }

    const getScoreTransactionDelay = (key: number): number => {
        let delay = 0;
        switch (plusMinusAction) {
            case 'plus':
                if (key !== undefined) {
                    delay = (key - hiddenStartingScores) * 30;
                }
                break;
            case 'minus':
                if (key !== undefined) {
                    delay = (hiddenStartingScores + visibleScores - 1 - key) * 30;
                }
                break;
        }
        return delay;
    }

    const getCircleTransactionDelay = (): number => {
        let delay = 0;
        switch (plusMinusAction) {
            case 'plus':
                if (selectedNumber !== undefined && selectedNumber !== null) {
                    delay = (selectedNumber - hiddenStartingScores) * 30;
                }
                break;
            case 'minus':
                if (selectedNumber !== undefined && selectedNumber !== null) {
                    delay = (hiddenStartingScores + visibleScores - 1 - selectedNumber) * 30;
                }
                break;
        }
        if (prevState !== undefined && (prevState.selection < lastVisibleScore - visibleScores || prevState.selection > lastVisibleScore)) {
            delay = 0;
        }
        return delay;
    }

    const getCircleTransactionDuration = (): string | undefined => {
        if (prevState !== undefined && (prevState.selection < lastVisibleScore - visibleScores - shiftStep || prevState.selection > lastVisibleScore + shiftStep)) {
            return '0.1s';
        }
        return undefined;
    }

    const scoresArr = [...Array(numberOfRenderedScores).keys()];
    const selectedNumberCircleStyle: React.CSSProperties = { transitionDuration: getCircleTransactionDuration(), transitionDelay: `${getCircleTransactionDelay()}ms` }
    if (mirrored) {
        scoresArr.reverse();
        if (typeof selectedNumber === 'number') {
            selectedNumberCircleStyle.right = `${(selectedNumber - hiddenStartingScores) * 34 + 2}px`;
        }
    }
    else {
        if (typeof selectedNumber === 'number') {
            selectedNumberCircleStyle.left = `${(selectedNumber - hiddenStartingScores) * 34 + 2}px`;
        }
    }

    return (
        <>
            <div className={classes.pointsInputContainer}>
                {!mirrored ?
                    <div style={hiddenStartingScores <= 0 ? { visibility: 'hidden' } : {}}>
                        <IconButton aria-label="close" onClick={handleMinusButton} className={classes.iconButtons}>
                            <RemoveIcon fontSize='small' />
                        </IconButton>
                    </div> :
                    <div>
                        <IconButton aria-label="close" onClick={handlePlusButton} className={classes.iconButtons}>
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </div>
                }
                <div className={classes.pointsInput} style={{ width: `${visibleScores * 34}px` }}>
                    {
                        scoresArr.map(key => {
                            const shift = key - hiddenStartingScores;
                            const shiftPx = shift * 34 - 4;
                            const style: React.CSSProperties = {};
                            if (isInitial) {
                                style.transitionDuration = '0s';
                            }
                            else {
                                style.transitionDelay = `${getScoreTransactionDelay(key)}ms`
                            }
                            if (!mirrored) {
                                style.left = `${shiftPx}px`;
                            }
                            else {
                                style.right = `${shiftPx}px`;
                            }

                            return (
                                <EnterScoreItem
                                    key={key}
                                    scoreNumber={key}
                                    onSelect={handleScoreSelect}
                                    style={style}
                                    disabled={disabledScore === key}
                                />
                            )
                        })
                    }
                    {selectedNumber !== null && selectedNumber !== undefined &&
                        <div className={classes.scoreItemSelected} style={selectedNumberCircleStyle} ></div>
                    }
                </div>
                {!mirrored ?
                    <div>
                        <IconButton aria-label="close" onClick={handlePlusButton} className={classes.iconButtons}>
                            <AddIcon fontSize='small' />
                        </IconButton>
                    </div> :
                    <div style={hiddenStartingScores <= 0 ? { visibility: 'hidden' } : {}}>
                        <IconButton aria-label="close" onClick={handleMinusButton} className={classes.iconButtons}>
                            <RemoveIcon fontSize='small' />
                        </IconButton>
                    </div>
                }
            </div>
        </>
    )
}

export default EnterScoreSelector
