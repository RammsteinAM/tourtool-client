import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import { StatePlayers } from '../../types/entities';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EliminationSidebarItem from './EliminationSidebarItem';
import eliminationSidebarStyles from './eliminationSidebarStyles';

const reorder = (list: StatePlayers, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

interface Props {
    players: StatePlayers,
    onChange: (players: StatePlayers) => void
}

const EliminationSidebar = (props: Props) => {
    const [players, setPlayers] = useState<StatePlayers>();
    const classes = eliminationSidebarStyles();
    const { t } = useTranslation();

    useEffect(() => {
        setPlayers(props.players)
    }, [props.players])

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            props.players,
            result.source.index,
            result.destination.index
        );

        setPlayers(items);
        props.onChange(items);
    }

    return (
        <div className={classes.eliminationSidebar}>
            <div className={classes.eliminationSidebarHeader}>
                <span className={classes.eliminationSidebarHeaderNumberSign}>#</span>
                <span>{t('Participant')}</span>
            </div>


            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ cursor: 'move' }}
                        >
                            {props.players && props.players.map((player, i) => (
                                <EliminationSidebarItem
                                    key={i}
                                    player={player}
                                    index={i}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default EliminationSidebar
