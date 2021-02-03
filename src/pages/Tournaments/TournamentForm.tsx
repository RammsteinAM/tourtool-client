import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerActions } from '../../redux/register/actions'
import { RootState } from '../../redux/store';
import { ActionStatus, Nullable } from '../../types/main';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import mainStyles from '../../styles/mainStyles';
import { RegisterFormValues } from '../../types/user';
import tournamentStyles from './tournamentStyles';
import { useParams } from 'react-router-dom';

const values = {
    minTables: 1,
    maxTables: 200,
    minGoals: 1,
    maxGoals: 100,
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

interface Props {

}

const TournamentForm = (props: Props) => {
    //const [goalsValue, setGoalsValue] = useState<number>(GoalValues.Number);
    const [draw, setDraw] = useState<boolean>(false);
    const [formState, setFormState] = React.useState<TournamentForm>({
        numberOfTables: 1,
        goals: GoalValues.Number,
        numberOfGoals: 7,
        draw: false,
        winningSets: 1,
    });
    const classes = tournamentStyles();
    const mainClasses = mainStyles();
    const { tournamentType } = useParams<{ tournamentType: string }>();
    const { t } = useTranslation();

    // const handleGoalsValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setGoalsValue(Number((event.target as HTMLInputElement).value));
    // };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof formState;
        setFormState({
            ...formState,
            [name]: event.target.checked,
        });
    };

    const handleSubmit = (e: React.FormEvent): void => {
        debugger
        e.preventDefault()
        alert(e.target)
        // setFormValues(values);
        // dispatch(registerActions.register(values));
    }

    const handleFormStateChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof formState;
        let value = event.target.value;
        if (name === 'numberOfTables') {
            if (event.target.value as number < values.minTables) {
                value = 1;
            }
            if (event.target.value as number > values.maxTables) {
                value = values.maxTables;
            }
            value = Math.round(value as number);
        }
        if (name === 'numberOfGoals') {
            if (event.target.value as number < values.minTables) {
                value = values.minTables;
            }
            if (event.target.value as number > values.maxGoals) {
                value = values.maxGoals;
            }
            value = Math.round(value as number);
        }
        setFormState({
            ...formState,
            [name]: value,
        });

    };

    return (
        <Paper elevation={3} className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit} id='tournament-form'>
                <div>
                    
                </div>
                <div className={classes.formBlock}>
                    <span className={classes.formLabel}>{t('Number of Tables')}</span>
                    <FormControlLabel
                        value={formState.numberOfTables}
                        label={t('Table', { count: formState.numberOfTables })}
                        classes={{ label: classes.formTextFieldSuffix }}
                        control={
                            <TextField
                                value={formState.numberOfTables}
                                id="numberOfTables"
                                type="number"
                                inputProps={{ min: `${values.minTables}`, max: `${values.maxTables}`, step: "1" }}
                                onChange={handleFormStateChange}
                                name="numberOfTables"
                                autoComplete="off"
                                className={classes.formTextField}
                            />
                        }
                    />
                </div>
                <div className={classes.formBlock}>
                    <RadioGroup aria-label="goals" name="goals" value={formState.goals} onChange={handleFormStateChange}>
                        <FormControlLabel value={GoalValues.Quick} control={<Radio color='primary' />} label={t('Quick Entry')} />
                        <FormControlLabel value={GoalValues.Number} control={<Radio color='primary' />} label={t('Goals to Win')} />
                    </RadioGroup>
                    <FormControlLabel
                        disabled={formState.goals === GoalValues.Quick}
                        value={formState.numberOfGoals}
                        label={t('Goal', { count: formState.numberOfGoals })}
                        classes={{ label: classes.formTextFieldSuffix }}
                        control={
                            <TextField
                                id="numberOfGoals"
                                type="number"
                                name="numberOfGoals"
                                onChange={handleFormStateChange}
                                inputProps={{ min: `${values.minGoals}`, max: `${values.maxGoals}`, step: "1" }}
                                defaultValue={formState.numberOfGoals}
                                autoComplete="off"
                                //disabled={formState.goals === GoalValues.Quick}
                                className={classes.formTextField}
                            />
                        }
                    />
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formState.draw}
                            onChange={handleCheckboxChange}
                            name="draw"
                            color="primary"
                        />
                    }
                    label={t('Draw')}
                />
                <div className={classes.formBlock}>
                    <span className={classes.formLabel}>{t('Winning Sets')}</span>
                    <Select
                        id="winningSets"
                        name="winningSets"
                        value={formState.winningSets}
                        onChange={handleFormStateChange}
                        className={classes.formSelect}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                        {
                            [...Array(10).keys()].map(key => (
                                <MenuItem value={key + 1}>{t('Set', { count: key + 1 })}</MenuItem>
                            ))
                        }
                    </Select>
                </div>
            </form>
        </Paper>
    )
}

export default TournamentForm
