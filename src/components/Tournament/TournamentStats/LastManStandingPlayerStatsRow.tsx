import React from 'react';
import clsx from 'clsx';
import { ReactComponent as DeadPlayerSkull } from '../../../resources/icons/lms.svg';
import KEKW from '../../../resources/icons/KEKW.png';
import monkaW from '../../../resources/icons/monkaW.png';
import Okayge from '../../../resources/icons/Okayge.png';
import lastManStandingStyles from './lastManStandingStyles';
import { LMSColOrderKeys, LMSTableProps } from '../../../types/entities';

interface Props extends LMSTableProps {
    placement: number;
    colOrderedKeys: LMSColOrderKeys[];
    showName?: boolean;
    showLives?: boolean;
    showPoints?: boolean;
    showNumberOfGames?: boolean;
    bttvMode?: boolean;
}

const LastManStandingPlayerStatsRow = (props: Props) => {
    const classes = lastManStandingStyles();
    return (
        <tr className={classes.lmsStatsTr}>
            <td className={clsx(classes.lmsStatsTd, classes.lmsStatsTdPlacement)}>{props.placement}</td>
            {props.colOrderedKeys.map((key: LMSColOrderKeys) => {
                if (key === 'lives') {
                    if (props[key] === 0) {
                        return (
                            <td className={classes.lmsStatsTd} style={{ verticalAlign: 'bottom' }} key={key}>
                                {!props.bttvMode ?
                                    <DeadPlayerSkull width={21} height={21} /> :
                                    <>
                                        <img width={21} height={21} src={KEKW} title='Dead KEKW' />
                                        <span style={{ verticalAlign: 'super' }}> 0</span>
                                    </>
                                }
                            </td>
                        )
                    }
                    if (props.bttvMode) {
                        return (
                            <td className={classes.lmsStatsTd} style={{ verticalAlign: 'bottom' }} key={key}>
                                <img width='auto' height={21} src={props[key] === 1 ? monkaW : Okayge} title={props[key] === 1 ? 'monkaW' : 'Okayge'} />
                                <span style={{ verticalAlign: 'super' }}> {props[key]}</span>
                            </td>
                        )
                    }
                }
                if (key === 'averagePoints') {
                    return <td className={classes.lmsStatsTd} key={key}>
                        {props[key]?.toFixed(2)}
                    </td>
                }
                return (props[key] || typeof props[key] === 'number') &&
                    <td className={clsx(classes.lmsStatsTd, { [classes.lmsStatsTdPlayer]: key === 'name' })} key={key}>
                        {props[key]}
                    </td>
            })}
        </tr>
    )
}

export default LastManStandingPlayerStatsRow
