import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from "react-i18next";
import { FetchedPlayers, PlayerCategory, StateEliminationPlayer, StateEliminationPlayers, StateParticipant, StateParticipants } from '../../types/entities';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import { CircularProgress } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';
import { ErrorNames } from '../../types/error';
import { ActionStatus } from '../../types/main';
import playerFormTextFieldStyles from './playerFormTextFieldStyles';

interface Props {
    index: number;
    player: StateParticipant;
    inputRef: React.RefObject<HTMLInputElement>[];
    showCategories: boolean;
    fetchedPlayers: FetchedPlayers;
    onKeyDown: (e: React.KeyboardEvent, index: number, name: string) => void;
    onCategoryChange: (index: number, category: PlayerCategory) => void;
    onBlur: (e: React.FocusEvent<Element>, index: number, name: string) => void;
    onChange: (index: number) => void;
}

const PlayerFormTextField = (props: Props) => {
    const [playerName, setPlayerName] = useState<string>(props.player.name as string);
    const addPlayersState = useSelector((state: RootState) => state.entities.addPlayers);
    const classes = playerFormTextFieldStyles();
    const { t } = useTranslation();

    useEffect(() => {
        setPlayerName(props.player.name as string);
    }, [props.player.name])

    const handleChange = (name: string) => {
        setPlayerName(name);
        props.onChange(props.index);
    };

    const handleBlur = (e: React.FocusEvent) => {
        props.onBlur(e, props.index, playerName);
    }

    return (
        <div className={classes.playerFormFieldContainer}>
            <div className={classes.playerFormFieldNumber}>{props.index + 1}</div>
            <TextField
                fullWidth
                size="small"
                value={playerName}
                type="text"
                onChange={
                    (event: React.ChangeEvent<{ value: unknown }>) => handleChange(event.target.value as string)
                }
                onKeyDown={
                    (event: React.KeyboardEvent) => {
                        props.onKeyDown(event, props.index, playerName)
                    }
                }
                onBlur={handleBlur}
                inputRef={props.inputRef[props.index]}
                autoComplete="off"
                className={clsx(classes.textField, classes.playerFormField)}
                InputProps={{
                    endAdornment: (playerName &&
                        <InputAdornment position="end">
                            {props.fetchedPlayers?.filter(p => p.name === playerName).length > 0 ?
                                <Tooltip title={`${t('Player exists in the Database')}`}>
                                    <CloudDoneIcon style={{ color: '#8ebd5e', fontSize: '22px', cursor: 'default' }} />
                                </Tooltip> :
                                (
                                    addPlayersState.status === ActionStatus.Request ?
                                        <CircularProgress size={20} /> :
                                        <Tooltip title={`${t('Player will be added to the Database')}`}>
                                            <CloudQueueIcon style={{ color: '#888888', fontSize: '22px', cursor: 'default' }} />
                                        </Tooltip>
                                )
                            }
                        </InputAdornment>
                    )
                }}
            />
            {props.showCategories &&
                <ul className={classes.playerFormGroupSelect}>
                    <li className={
                        clsx(classes.playerFormGroupSelectItem,
                            { [classes.playerFormGroupSelectItemSeleced]: props.player.category === 'A' }
                        )
                    }
                        onClick={() => props.onCategoryChange(props.index, 'A')}
                    >
                        <a>{t('A')}</a>
                    </li>
                    <li
                        className={
                            clsx(classes.playerFormGroupSelectItem,
                                { [classes.playerFormGroupSelectItemSelecedNeutral]: !props.player.category }
                            )
                        }
                        onClick={() => props.onCategoryChange(props.index, null)}
                    >
                        <a className="none">—</a>
                    </li>
                    <li className={
                        clsx(classes.playerFormGroupSelectItem,
                            { [classes.playerFormGroupSelectItemSeleced]: props.player.category === 'B' }
                        )
                    }
                        onClick={() => props.onCategoryChange(props.index, 'B')}
                    >
                        <a>{t('B')}</a>
                    </li>
                </ul>
            }
        </div>
    )
}

export default PlayerFormTextField
