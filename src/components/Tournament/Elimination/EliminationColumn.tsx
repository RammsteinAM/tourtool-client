import React from 'react';
import { useTranslation } from "react-i18next";
import tournamentStyles from './eliminationStyles';

interface Props {
    children: any;
    numberOfColumns: number;
    colNumber: number;
    firstRoundGameNumber: number;
}

const EliminationColumn = ({ children, numberOfColumns, firstRoundGameNumber, colNumber }: Props) => {
    const roundNumberDenominator: number = 2 ** (numberOfColumns - colNumber);
    const classes = tournamentStyles();
    const { t } = useTranslation();

    const renderBetweenColumnSpaces = (columnNumber: number) => {
        const result = [];
        for (let i = firstRoundGameNumber / (2 ** (columnNumber - 1)) / 2; i >= 1; i--) {
            result.push(
                <div
                    key={`gameCardLines_${columnNumber}_${i}`}
                    style={{ height: `calc(4 * (25% - ${95 * firstRoundGameNumber / 8}px)/${firstRoundGameNumber / ((2 ** (columnNumber - 1)) * 2)})` }}
                    className={classes.gameBetweenColumnSpaceItem}
                >
                    <div className={classes.gameConnectiongLines_Top}></div>
                    <div className={classes.gameConnectiongLines_TopCorner}></div>
                    <div className={classes.gameConnectiongLines_MiddleV}></div>
                    <div className={classes.gameConnectiongLines_MiddleH}></div>
                    <div className={classes.gameConnectiongLines_BottomCorner}></div>
                    <div className={classes.gameConnectiongLines_Bottom}></div>
                </div>
            )
        }
        return result;
    }

    return (
        <div key={`gameColumn_${colNumber}`}>
            <div className={classes.gameColumn}>
                <div>
                    <div className={classes.gameColumnHeader}>
                        <span>{roundNumberDenominator >= 4 && '1/' + roundNumberDenominator} </span>
                        <span>{roundNumberDenominator === 2 ? t('Semifinal') : t('Final', { count: roundNumberDenominator })} </span>
                    </div>
                    <div className={classes.gameColumnContent}>
                        {children}
                    </div>
                </div>
                {
                    numberOfColumns - colNumber >= 1 &&
                    <div className={classes.gameBetweenColumnsSpace}>
                        {renderBetweenColumnSpaces(colNumber)}
                    </div>
                }
            </div>
        </div>
    )
}

export default EliminationColumn
