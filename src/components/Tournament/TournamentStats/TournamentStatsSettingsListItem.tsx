import React from 'react'
import { useTranslation } from "react-i18next";
import { Draggable } from "react-beautiful-dnd";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { updateSettings } from '../../../redux/settings/actions';
import { LMSColOrderKeys } from '../../../types/entities';
import tournamentStatsSettingsListStyles from './tournamentStatsSettingsListStyles';

interface Props {
    keyName: LMSColOrderKeys,
    index: number;
    enabled?: boolean;
}

const TournamentStatsSettingsListItem = (props: Props) => {
    const statsEnabledColumns = useSelector((state: RootState) => state.settings.tournamentSidebarEnabledColumns) || ['name', 'numberOfGames', 'lives'];
    const dispatch = useDispatch();
    const classes = tournamentStatsSettingsListStyles();
    const { t } = useTranslation();
    const statNames: { [key in LMSColOrderKeys]: string } = {
        name: t('Player Name'),
        lives: t('Lives Left'),
        numberOfGames: t('Match Count'),
        points: t('Points'),
        averagePoints: t('Average Points'),
        goals: t('Goals'),
        goalsIn: t('Goals In'),
        goalDiff: t('Goal Difference'),        
        matchesWon: t('Matches Won'),
        matchesLost: t('Matches Lost'),
        matchesDraw: t('Matches Draw'),
    }

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        background: isDragging ? "#ffffff44" : "initial",
        boxShadow: isDragging ? "0px 2px 12px #00000077" : "initial",
        ...draggableStyle,
        cursor: 'move',
        outline: 'none',
    });

    const handleVisibilityChange = () => {
        if (statsEnabledColumns.indexOf(props.keyName) >= 0) {
            dispatch(updateSettings({tournamentSidebarEnabledColumns: [...statsEnabledColumns].filter(col => col !== props.keyName)}));
            return;
        }
        dispatch(updateSettings({tournamentSidebarEnabledColumns: [...statsEnabledColumns, props.keyName]}));
    }

    return (
        <Draggable key={props.keyName + props.index} draggableId={props.keyName + props.index} index={props.index}>
            {(provided, snapshot) => (
                <div
                    className={classes.item}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <div className={classes.name}>{statNames[props.keyName]}</div>
                    
                    <IconButton
                            onClick={handleVisibilityChange}
                            aria-label="show more"
                            className={classes.iconButton}
                        >
                            <VisibilityIcon style={{color: props.enabled ? '#c5c8cb' : '#000000'}} />
                        </IconButton> 
                    <div className={classes.dragIcon}>
                        <DragHandleIcon />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default TournamentStatsSettingsListItem
