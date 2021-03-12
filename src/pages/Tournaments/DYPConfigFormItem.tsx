import React from 'react'
import { useTranslation } from "react-i18next";
import AddIcon from '@material-ui/icons/Add';
import tournamentStyles from './tournamentStyles';
import DYPConfigFormItemPlayerSelect from './DYPConfigFormItemPlayerSelect';

interface Props {
    selectedPlayer1: string | undefined,
    selectedPlayer2: string | undefined,
    onChange: (newPlayerName: string | undefined, index: [number, number], oldPlayerName: string | undefined) => void,
    assignedPlayerNames: (string | undefined)[],
    removedPlayerNames: (string | undefined)[],
    index: number,
}

const DYPConfigFormItem = ({ selectedPlayer1, selectedPlayer2, assignedPlayerNames, removedPlayerNames, onChange, index }: Props) => {
    const classes = tournamentStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.dypConfigItemContainer}>
            <DYPConfigFormItemPlayerSelect
                selectedPlayer={selectedPlayer1}
                onChange={onChange}
                assignedPlayerNames={assignedPlayerNames}
                removedPlayerNames={removedPlayerNames}
                index={[index, 0]}
            />
            <AddIcon className={classes.dypConfigItemIcon} />
            <DYPConfigFormItemPlayerSelect
                selectedPlayer={selectedPlayer2}
                onChange={onChange}
                assignedPlayerNames={assignedPlayerNames}
                removedPlayerNames={removedPlayerNames}                
                index={[index, 1]}
            />
        </div>
    )
}

export default DYPConfigFormItem
