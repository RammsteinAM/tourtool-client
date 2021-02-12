import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { StatePlayer, StatePlayers } from '../../types/entities';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import tournamentStyles from './tournamentStyles';

interface Props {
    player: StatePlayer,
    index: number;
}

const EliminationSidebarItem = (props: Props) => {
    const classes = tournamentStyles();
    const { t } = useTranslation();

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        background: isDragging ? "#ffffff44" : "initial",
        boxShadow: isDragging ? "0px 2px 12px #00000077" : "initial",
        ...draggableStyle,
        cursor: 'move',
        outline: 'none',
    });

    return (
        <Draggable key={props.player.name + props.index} draggableId={props.player.name + props.index} index={props.index}>
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
                        <div className={classes.eliminationSidebarItemPlayer}>{props.player?.name}</div>
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
