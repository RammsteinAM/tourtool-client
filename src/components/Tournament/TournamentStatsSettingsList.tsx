import React from 'react'
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LMSColOrderKeys } from '../../pages/Tournaments/LastManStandingPlayerStatsRow';
import TournamentStatsSettingsListItem from './TournamentStatsSettingsListItem';
import tournamentStatsSettingsListStyles from './tournamentStatsSettingsListStyles';

const reorder = (list: LMSColOrderKeys[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

interface Props {
    orderedColumns: LMSColOrderKeys[],
    enabledColumns: LMSColOrderKeys[],
    onChange: (players: LMSColOrderKeys[]) => void
}

const TournamentStatsSettingsList = (props: Props) => {
    const classes = tournamentStatsSettingsListStyles();
    const { t } = useTranslation();

    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            props.orderedColumns,
            result.source.index,
            result.destination.index
        );

        props.onChange(items);
    }

    return (
        <div className={classes.eliminationSidebar}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ cursor: 'move' }}
                        >
                            {props.orderedColumns && props.orderedColumns.map((columnName, i) => (
                                <TournamentStatsSettingsListItem
                                    key={i}
                                    keyName={columnName}
                                    index={i}
                                    enabled={props.enabledColumns.indexOf(columnName) >= 0}
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

export default TournamentStatsSettingsList
