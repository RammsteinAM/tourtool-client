import React from 'react'
import { useTranslation } from "react-i18next";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import mainStyles from '../../styles/mainStyles';
import ListSubheader from '@material-ui/core/ListSubheader';
import tournamentStyles from './tournamentStyles';

interface Props {
    selectedPlayer: string | undefined,
    onChange: (newPlayerName: string | undefined, index: [number, number], oldPlayerName: string | undefined) => void,
    assignedPlayerNames: (string | undefined)[],
    removedPlayerNames: (string | undefined)[],
    index: [number, number],
}

const DYPConfigFormItemPlayerSelect = ({ selectedPlayer, assignedPlayerNames, removedPlayerNames, onChange, index }: Props) => {
    const mainClasses = mainStyles();
    const classes = tournamentStyles();
    const { t } = useTranslation();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onChange(event.target.value as string, index, selectedPlayer);
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
            {removedPlayerNames.length > 0 &&
                <ListSubheader style={{pointerEvents: 'none'}}>{t('Removed')}</ListSubheader>
            }
            {removedPlayerNames.length > 0 && removedPlayerNames.map((player, index: number) => {
                return player ? <MenuItem key={index} value={player}>{player}</MenuItem> : null;
            })}
            {assignedPlayerNames.length > 0 &&
                <ListSubheader style={{pointerEvents: 'none'}}>{t('Assigned')}</ListSubheader>
            }
            {assignedPlayerNames.length > 0 && assignedPlayerNames.map((player, index: number) => {
                return player ? <MenuItem key={index} value={player}>{player}</MenuItem> : null;
            })}
        </Select>
    )
}

export default DYPConfigFormItemPlayerSelect
