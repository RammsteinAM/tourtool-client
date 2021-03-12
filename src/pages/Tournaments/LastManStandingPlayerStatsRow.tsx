import React from 'react';
import clsx from 'clsx';
import { ReactComponent as DeadPlayerSkull } from '../../resources/icons/lms.svg';
import KEKW from '../../resources/icons/KEKW.png';
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
    easterEgg?: boolean;
}

const LastManStandingPlayerStatsRow = (props: Props) => {
    const classes = lastManStandingStyles();

    return (
        <tr className={classes.lmsStatsTr}>
            <td className={clsx(classes.lmsStatsTd, classes.lmsStatsTdPlacement)}>{props.placement}</td>
            {props.colOrderedKeys.map((key: LMSColOrderKeys) => {
                if (key === 'lives' && props[key] === 0) {
                    return <td className={classes.lmsStatsTd} style={{verticalAlign: 'bottom'}}>
                        {!props.easterEgg ? <DeadPlayerSkull width={21} height={21} /> : <img width={21} height={21} src={KEKW} title='Dead KEKW' />}
                    </td>
                }
                return (props[key] || typeof props[key] === 'number') &&
                    <td className={clsx(classes.lmsStatsTd, { [classes.lmsStatsTdPlayer]: key === 'name' })}>
                        {props[key]}
                    </td>
            })}
        </tr>
    )
}

export default LastManStandingPlayerStatsRow
