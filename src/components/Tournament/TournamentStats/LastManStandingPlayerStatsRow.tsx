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
                const value = props[key];
                if (key === 'lives' && typeof value === 'number') {
                    if (value <= 0) {
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
                                <img width='auto' height={21} src={value === 1 ? monkaW : Okayge} title={value === 1 ? 'monkaW' : 'Okayge'} />
                                <span style={{ verticalAlign: 'super' }}> {value}</span>
                            </td>
                        )
                    }
                }
                if (key === 'averagePoints' && typeof value === 'number') {
                    return <td className={classes.lmsStatsTd} key={key}>
                        {value?.toFixed(2)}
                    </td>
                }
                return (value || typeof value === 'number') &&
                    <td className={clsx(classes.lmsStatsTd, { [classes.lmsStatsTdPlayer]: key === 'name' })} key={key}>
                        {value}
                    </td>
            })}
        </tr>
    )
}

export default LastManStandingPlayerStatsRow
