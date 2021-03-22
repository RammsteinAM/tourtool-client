import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { StateEliminationPlayer, StateEliminationPlayers, StateParticipant } from '../../../types/entities';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import eliminationSidebarStyles from './eliminationSidebarStyles';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { getNormalizedParticipants } from '../../../utils/arrayUtils';

interface Props {
    player: StateEliminationPlayer,
    index: number;
}

const EliminationSidebarItem = (props: Props) => {
    const storeParticipants = useSelector((state: RootState) => state.entities.participants);
    const classes = eliminationSidebarStyles();
    const { t } = useTranslation();
    
    const normalizedParticipants = getNormalizedParticipants(storeParticipants);
    const playerId: string = typeof props.player.id === 'object' ? props.player.id.join('/') : props.player.id?.toString();
    const playerName = typeof props.player.id === 'object' ? `${normalizedParticipants[props.player.id[0]]?.name} / ${normalizedParticipants[props.player.id[1]]?.name} ` : normalizedParticipants[props.player.id]?.name

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        background: isDragging ? "#ffffff44" : "initial",
        boxShadow: isDragging ? "0px 2px 12px #00000077" : "initial",
        ...draggableStyle,
        cursor: 'move',
        outline: 'none',
    });

    return (
        <Draggable key={playerId + props.index} draggableId={playerId + props.index} index={props.index}>
            {(provided, snapshot) => (
                <div
                    className={classes.eliminationSidebarItem}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <div className={classes.eliminationSidebarItemNumber}>{props.index + 1}</div>
                    {props.player && props.player.bye ?
                        <div className={classes.eliminationSidebarItemPlayerBye}>{t('<Bye>')}</div> :
                        <div className={classes.eliminationSidebarItemPlayer}>{playerName}</div>
                    }
                    <div className={classes.eliminationSidebarItemIcon}>
                        <DragHandleIcon />
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default EliminationSidebarItem
