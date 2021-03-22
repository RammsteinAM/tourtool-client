import React from 'react'
import { useTranslation } from "react-i18next";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import mainStyles from '../../../styles/mainStyles';
import ListSubheader from '@material-ui/core/ListSubheader';
import { StateParticipant } from '../../../types/entities';
import dypFormStyles from './dypFormStyles';

interface Props {
    selectedPlayer: number | undefined,
    onChange: (newPlayerId: number | undefined, index: [number, number], oldPlayerId: number | undefined) => void,
    assignedPlayerIds: (number | undefined)[],
    removedPlayerIds: (number | undefined)[],
    playersData: { [id: number]: StateParticipant };
    index: [number, number],
}

const DYPConfigFormItemPlayerSelect = ({ selectedPlayer, assignedPlayerIds, playersData, removedPlayerIds, onChange, index }: Props) => {
    const mainClasses = mainStyles();
    const classes = dypFormStyles();
    const { t } = useTranslation();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        debugger
        onChange(event.target.value as number, index, selectedPlayer);
    };

    return (
        <Select
            fullWidth
            value={selectedPlayer}
            onChange={handleChange}
            className={clsx(mainClasses.select, classes.dypConfigSelect)}
            MenuProps={{ classes: { paper: classes.dypConfigSelectMenuPaper, list: classes.dypConfigSelectMenuList } }}
        >
            {selectedPlayer &&
                <MenuItem>{t('Remove Player')}</MenuItem>
            }
            {removedPlayerIds.length > 0 &&
                <ListSubheader style={{pointerEvents: 'none'}}>{t('Removed')}</ListSubheader>
            }
            {removedPlayerIds.length > 0 && removedPlayerIds.map((id, index: number) => {
                return id ? <MenuItem key={index} value={id}>{playersData[id]?.name}</MenuItem> : null;
            })}
            {assignedPlayerIds.length > 0 &&
                <ListSubheader style={{pointerEvents: 'none'}}>{t('Assigned')}</ListSubheader>
            }
            {assignedPlayerIds.length > 0 && assignedPlayerIds.map((id, index: number) => {
                return id ? <MenuItem key={index} value={id}>{playersData[id]?.name}</MenuItem> : null;
            })}
        </Select>
    )
}

export default DYPConfigFormItemPlayerSelect
