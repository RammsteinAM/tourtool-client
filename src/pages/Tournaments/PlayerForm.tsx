import React, { createRef, useEffect, useState } from 'react'
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import mainStyles from '../../styles/mainStyles';
import { RegisterFormValues } from '../../types/user';
import { useParams } from 'react-router-dom';
import { formMinMaxValues } from '../../utils/constants';
import FormSubheader from '../../components/FormComponents/FormSubheader';
import { ReactComponent as Teams } from '../../resources/icons/teams.svg';
import { ReactComponent as Single } from '../../resources/icons/single.svg';
import { ReactComponent as DrawYourPartner } from '../../resources/icons/drawYourPartner.svg';
import toast from '../../components/IndependentSnackbar';
import tournamentStyles from './tournamentStyles';

interface Duplicate {
    player: string;
    index: number;
}

interface TournamentForm {
    numberOfTables: number,
    goals: GoalValues,
    numberOfGoals: number,
    draw: boolean,
    winningSets: number;
}

enum GoalValues {
    Quick = 'quick',
    Number = 'number',
}

enum SubheaderStateValues {
    Tables = 'tables',
    Goals = 'goals',
    Points = 'points',
}

interface Props {

}

const PlayerForm = (props: Props) => {
    const [formState, setFormState] = React.useState<TournamentForm>({
        numberOfTables: 1,
        goals: GoalValues.Number,
        numberOfGoals: 7,
        draw: false,
        winningSets: 1,
    });
    const [players, setPlayers] = useState<string[]>([""]);
    const [fieldRefs, setFieldRefs] = useState<React.RefObject<HTMLInputElement>[]>([]);
    const classes = tournamentStyles();
    const mainClasses = mainStyles();
    const history = useHistory();
    const { playerType } = useParams<{ playerType: string }>();
    const { t } = useTranslation();

    useEffect(() => {
        setFieldRefs(fieldRefs => (
            Array(players.length).fill(null).map((_, i) => fieldRefs[i] || createRef())
        ));
    }, [players.length]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof formState;
        setFormState({
            ...formState,
            [name]: event.target.checked,
        });
    };

    const handleSubmit = (e: React.FormEvent): void => {
        //history.push('/tournament-player-type-select');
        e.preventDefault()
        alert(e.target)
        // setFormValues(values);
        // dispatch(registerActions.register(values));
    }

    const getDuplicate = (): Duplicate => {
        const duplicates: Duplicate[] = []
        players.forEach((player, index) => {
            if (player && players.indexOf(player) !== index) {
                duplicates.push({ player, index })
            }
        })
        return duplicates[0];
    }

    const handlePlayerChange = (name: string, index: number) => {
        let newPlayers = [...players];
        newPlayers[index] = name;
        if (newPlayers[newPlayers.length - 1]) {
            newPlayers.push("");
        }

        setPlayers([...newPlayers]);
    };

    const insertMiddleRow = (index: number) => {
        const newPlayers = [...players];
        if (players[index - 1]) {
            newPlayers.splice(index, 0, "")
            setPlayers([...newPlayers]);
        }

    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number, player: string) => {
        debugger
        const duplicate = getDuplicate();
        if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            if (duplicate && index >= players.length - 2) {
                toast.warning(t('player-form-duplicate-name', { name: duplicate.player }));
                fieldRefs[duplicate.index]?.current?.focus();
                fieldRefs[duplicate.index]?.current?.select();
            }
            else {
                fieldRefs[index + 1]?.current?.focus();
                if (e.key === "Enter") {
                    if (e.ctrlKey) insertMiddleRow(index + 1);
                    else fieldRefs[players.length - 1]?.current?.focus();                    
                }
            }
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            fieldRefs[index - 1]?.current?.focus()
        }
        if (e.key === "Backspace" && !player) {
            fieldRefs[index - 1]?.current?.focus();
        }
    }

    const handleBlur = (name: string, index: number) => {
        let newPlayers = [...players];
        newPlayers = newPlayers.filter(val => {
            return (!!val && players.length !== index - 1);
        });
        newPlayers.push("");

        setPlayers([...newPlayers]);
    }

    const renderHeader = () => {
        switch (playerType) {
            case 'single':
                return (
                    <div
                        className={classes.playerFormHeader}
                        style={{ backgroundImage: 'linear-gradient(-180deg,#e89e67,#e16f3d)' }}
                    >
                        <Single />
                        <div>{t('Single')}</div>
                    </div>
                )
            case 'teams':
                return (
                    <div
                        className={classes.playerFormHeader}
                        style={{ backgroundImage: 'linear-gradient(-180deg,#b0d275,#8dc44c)' }}
                    >
                        <Teams />
                        <div>{t('Teams')}</div>
                    </div>
                )
            case 'drawYourPartner':
                return (
                    <div
                        className={classes.playerFormHeader}
                        style={{ backgroundImage: 'linear-gradient(-180deg,#58e0f5,#00b8d4)' }}
                    >
                        <DrawYourPartner />
                        <div>{t('Draw Your Partner')}</div>
                    </div>
                )
            default:
                break;
        }
    }

    return (
        <Paper elevation={3} className={classes.playerFormPaper}>
            <form className={classes.form} onSubmit={handleSubmit} id='tournament-form'>
                {renderHeader()}
                <FormSubheader title={t('Names')} text={t('form-subheader-names-text')} width={366} />
                <div>
                    {players.map((player, index) => {
                        return (
                            <div key={index} className={classes.playerFormFieldContainer}>
                                <div className={classes.playerFormFieldNumber}>{index + 1}</div>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={player}
                                    key={index}
                                    type="text"
                                    onChange={
                                        (event: React.ChangeEvent<{ value: unknown }>) => {
                                            handlePlayerChange(event.target.value as string, index)
                                        }
                                    }
                                    onKeyDown={
                                        (event: React.KeyboardEvent) => {
                                            handleKeyDown(event, index, player)
                                        }
                                    }
                                    onBlur={
                                        (event: React.ChangeEvent<{ value: unknown }>) => {
                                            handleBlur(event.target.value as string, index)
                                        }
                                    }
                                    inputRef={fieldRefs[index]}
                                    autoComplete="off"
                                    className={clsx(classes.textField, classes.playerFormField)}
                                />
                            </div>
                        )
                    })}
                </div>
            </form>
        </Paper>
    )
}

export default PlayerForm
