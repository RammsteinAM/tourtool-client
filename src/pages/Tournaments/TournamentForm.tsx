import React, { useState } from 'react'
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
import tournamentStyles from './tournamentStyles';
import FormSubheader from '../../components/FormComponents/FormSubheader';

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

interface SubheaderState {
    [subheader: string]: boolean | undefined;
}

interface Props {

}

const TournamentForm = (props: Props) => {
    //const [goalsValue, setGoalsValue] = useState<number>(GoalValues.Number);
    const [formState, setFormState] = React.useState<TournamentForm>({
        numberOfTables: 1,
        goals: GoalValues.Number,
        numberOfGoals: 7,
        draw: false,
        winningSets: 1,
    });
    const [subheaderState, setSubeaderState] = useState<SubheaderState>({});
    const classes = tournamentStyles();
    const mainClasses = mainStyles();
    const history = useHistory();
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
        history.push('/tournament-player-type-select');
        e.preventDefault()
        alert(e.target)
        // setFormValues(values);
        // dispatch(registerActions.register(values));
    }

    const handleFormStateChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof formState;
        let value = event.target.value;
        if (name === 'numberOfTables') {
            if (event.target.value as number < formMinMaxValues.minTables) {
                value = 1;
            }
            if (event.target.value as number > formMinMaxValues.maxTables) {
                value = formMinMaxValues.maxTables;
            }
            value = Math.round(value as number);
        }
        if (name === 'numberOfGoals') {
            if (event.target.value as number < formMinMaxValues.minTables) {
                value = formMinMaxValues.minTables;
            }
            if (event.target.value as number > formMinMaxValues.maxGoals) {
                value = formMinMaxValues.maxGoals;
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
                <FormSubheader title={t('Tables')} text={t('form-subheader-tables-text')} width={454} />
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
                                inputProps={{ min: `${formMinMaxValues.minTables}`, max: `${formMinMaxValues.maxTables}`, step: "1" }}
                                onChange={handleFormStateChange}
                                name="numberOfTables"
                                autoComplete="off"
                                className={classes.formTextField}
                            />
                        }
                    />
                </div>
                <FormSubheader title={t('Goals')} text={t('form-subheader-goals-text')} width={454} />
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
                                inputProps={{ min: `${formMinMaxValues.minGoals}`, max: `${formMinMaxValues.maxGoals}`, step: "1" }}
                                defaultValue={formState.numberOfGoals}
                                autoComplete="off"
                                //disabled={formState.goals === GoalValues.Quick}
                                className={classes.formTextField}
                            />
                        }
                    />
                </div>
                <div className={classes.formBlock}>
                    <FormControlLabel
                        disabled={tournamentType === 'elimination'}
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
                </div>
                <FormSubheader title={t('Winning Sets')} width={454} />
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
