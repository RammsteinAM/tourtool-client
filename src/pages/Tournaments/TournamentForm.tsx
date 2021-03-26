import React from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from 'react-router-dom';
import { formMinMaxValues } from '../../utils/constants';
import FormSubheader from '../../components/FormComponents/FormSubheader';
import { useDispatch } from 'react-redux';
import { updateTournament } from '../../redux/tournamentEntities/actions';
import { TournamentTypes } from '../../types/entities';
import clsx from 'clsx';
import tournamentStyles from './tournamentStyles';

interface ITournamentForm {
    numberOfTables: number,
    goals: boolean,
    numberOfGoals: number,
    draw: boolean,
    sets: number;
    numberOfLives?: number;
    pointsForWin?: number;
    pointsForDraw?: number;
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
    const [formState, setFormState] = React.useState<ITournamentForm>({
        numberOfTables: 1,
        goals: true,
        numberOfGoals: 7,
        draw: false,
        sets: 1,
        numberOfLives: 3,
        pointsForWin: 2,
        pointsForDraw: 1,
    });
    const classes = tournamentStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { tournamentType } = useParams<{ tournamentType: TournamentTypes }>();
    const { t } = useTranslation();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof formState;
        setFormState({
            ...formState,
            [name]: event.target.checked,
        });
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        dispatch(updateTournament(formState))
        history.push(`/tournament/player-type-select/${tournamentType}`);
    }

    const handleFormStateChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof formState;
        let value = event.target.value;
        if (name === 'goals') {
            value = event.target.value === 'true'
        }
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
                {tournamentType === 'lms' &&
                    <>
                        <FormSubheader title={t('Last Man Standing')} text={t('form-subheader-lms-text')} descriptionWidth={454} />
                        <div className={classes.formBlock}>
                            <span className={classes.formLabel}>{t('Number of Lives')}</span>
                            <Select
                                id="numberOfLives"
                                name="numberOfLives"
                                value={formState.numberOfLives}
                                onChange={handleFormStateChange}
                                className={classes.formSelect}
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                                {
                                    [...Array(10).keys()].map(key => (
                                        <MenuItem key={key} value={key + 1}>{t('Life', { count: key + 1 })}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </>
                }
                <FormSubheader title={t('Tables')} text={t('form-subheader-tables-text')} descriptionWidth={454} />
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
                <FormSubheader title={t('Goals')} text={t('form-subheader-goals-text')} descriptionWidth={454} />
                <div className={classes.formBlock}>
                    <RadioGroup aria-label="goals" name="goals" value={formState.goals} onChange={handleFormStateChange}>
                        <FormControlLabel value={false} control={<Radio color='primary' />} label={t('Quick Entry')} />
                        <FormControlLabel value={true} control={<Radio color='primary' />} label={t('Goals to Win')} />
                    </RadioGroup>
                    <FormControlLabel
                        disabled={!formState.goals}
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
                                //defaultValue={formState.numberOfGoals}
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
                <FormSubheader title={formState.draw ? t('Sets') : t('Winning Sets')} descriptionWidth={454} />
                        <div className={classes.formBlock}>
                            <span className={classes.formLabel}>{formState.draw ? t('Sets') : t('Winning Sets')}</span>
                            <Select
                                id="sets"
                                name="sets"
                                value={formState.sets}
                                onChange={handleFormStateChange}
                                className={classes.formSelect}
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                                {
                                    [...Array(10).keys()].map(key => (
                                        <MenuItem key={key} value={key + 1}>{t('Set', { count: key + 1 })}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                {(tournamentType === 'lms' || tournamentType === 'roundRobin') &&
                    <>
                        <FormSubheader title={t('Points')} /* text={t('form-subheader-points-text')} descriptionWidth={454} */ />
                        <div className={classes.formBlock}>
                            <span className={classes.formLabel}>{t('Points for Win')}</span>
                            <Select
                                id="pointsForWin"
                                name="pointsForWin"
                                value={formState.pointsForWin}
                                onChange={handleFormStateChange}
                                className={classes.formSelect}
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                                {
                                    [...Array(100).keys()].map(key => (
                                        <MenuItem key={key} value={key + 1}>{t('Point', { count: key + 1 })}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                        <div
                            className={clsx(classes.formBlock,
                                { 'disabled': !formState.draw }
                            )}
                        >
                            <span className={classes.formLabel}>{t('Points for Draw')}</span>
                            <Select
                                disabled={!formState.draw}
                                id="pointsForDraw"
                                name="pointsForDraw"
                                value={formState.pointsForDraw}
                                onChange={handleFormStateChange}
                                className={classes.formSelect}
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                                {
                                    [...Array(100).keys()].map(key => (
                                        <MenuItem key={key} value={key + 1}>{t('Point', { count: key + 1 })}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </>
                }
            </form>
        </Paper>
    )
}

export default TournamentForm
