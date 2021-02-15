import React, { useState, useEffect } from 'react'
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from "react-i18next";
import { PlayerCategory, StatePlayer, StatePlayers } from '../../types/entities';
import playerFormTextFieldStyles from './playerFormTextFieldStyles';

interface Props {
    index: number;
    player: StatePlayer;
    inputRef: React.RefObject<HTMLInputElement>[];
    showCategories: boolean;
    onKeyDown: (e: React.KeyboardEvent, index: number, name: string) => void;
    onCategoryChange: (index: number, category: PlayerCategory) => void;
    onBlur: (e: React.FocusEvent<Element>, index: number, name: string) => void;
    onChange: (index: number) => void;
}

const PlayerFormTextField = (props: Props) => {
    const [playerName, setPlayerName] = useState<string>(props.player.name);
    const classes = playerFormTextFieldStyles();
    const { t } = useTranslation();

    useEffect(() => {
        setPlayerName(props.player.name);
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
