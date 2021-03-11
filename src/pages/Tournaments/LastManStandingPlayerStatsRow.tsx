import React from 'react';
import clsx from 'clsx';
import lastManStandingStyles from './lastManStandingStyles';

interface LMSTableProps {
    name?: string;
    lives?: number;
    numberOfGames?: number;
    points?: number;
    goals?: number;
    goalsIn?: number;
    goalDiff?: number;
}

export type LMSColOrderKeys = (keyof LMSTableProps);

interface Props extends LMSTableProps {    
    placement: number;
    colOrderedKeys: LMSColOrderKeys[];
    showName?: boolean;
    showLives?: boolean;
    showPoints?: boolean;
    showNumberOfGames?: boolean;
}

const LastManStandingPlayerStatsRow = (props: Props) => {
    const classes = lastManStandingStyles();

    return (
        <tr className={classes.lmsStatsTr}>
            <td className={clsx(classes.lmsStatsTd, classes.lmsStatsTdPlacement)}>{props.placement}</td>
            {props.colOrderedKeys.map((key: LMSColOrderKeys) => (
                (props[key] || typeof props[key] === 'number') && <td className={classes.lmsStatsTd}>{props[key]}</td>
            ))}
        </tr>
    )
}

export default LastManStandingPlayerStatsRow
