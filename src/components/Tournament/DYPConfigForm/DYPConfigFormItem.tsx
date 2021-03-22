import React from 'react'
import { useTranslation } from "react-i18next";
import AddIcon from '@material-ui/icons/Add';
import dypFormStyles from './dypFormStyles';
import DYPConfigFormItemPlayerSelect from './DYPConfigFormItemPlayerSelect';
import { FetchedPlayers, StateParticipant } from '../../../types/entities';

interface Props {
    selectedPlayer1: number | undefined,
    selectedPlayer2: number | undefined,
    onChange: (newPlayerId: number | undefined, index: [number, number], oldPlayerId: number | undefined) => void,
    playersData: { [id: number]: StateParticipant };
    assignedPlayerIds: (number | undefined)[],
    removedPlayerIds: (number | undefined)[],
    index: number,
}

const DYPConfigFormItem = ({ selectedPlayer1, selectedPlayer2, playersData, assignedPlayerIds, removedPlayerIds, onChange, index }: Props) => {
    const classes = dypFormStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.dypConfigItemContainer}>
            <DYPConfigFormItemPlayerSelect
                selectedPlayer={selectedPlayer1}
                onChange={onChange}
                assignedPlayerIds={assignedPlayerIds}
                removedPlayerIds={removedPlayerIds}
                playersData={playersData}
                index={[index, 0]}
            />
            <AddIcon className={classes.dypConfigItemIcon} />
            <DYPConfigFormItemPlayerSelect
                selectedPlayer={selectedPlayer2}
                onChange={onChange}
                assignedPlayerIds={assignedPlayerIds}
                removedPlayerIds={removedPlayerIds}                
                playersData={playersData}                
                index={[index, 1]}
            />
        </div>
    )
}

export default DYPConfigFormItem
