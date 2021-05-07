import React, { useEffect, useState } from 'react';
import LanguageSelect from '../LanguageSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import FormSubheader from '../FormComponents/FormSubheader';
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { formMinMaxValues } from '../../utils/constants';
import { entityActions } from '../../redux/tournamentEntities/actions';
import clsx from 'clsx';
import settingsStyles from './settingsStyles';

interface Props {

}

const LastManStandingSettings = (props: Props) => {
  const [tournamentName, setTournamentName] = useState<string>('')
  const entityState = useSelector((state: RootState) => state.entities);
  const settingsState = useSelector((state: RootState) => state.settings);
  const fetchedGames = useSelector((state: RootState) => state.games.data);
  const dispatch = useDispatch();
  const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
  const tournamentId = parseInt(tournamentIdString, 10);
  const fetchedTournamentData = entityState.fetchedTournaments.data[tournamentId];
  const classes = settingsStyles();
  const { t } = useTranslation();

  useEffect(() => {
    if (fetchedTournamentData) {
      setTournamentName(fetchedTournamentData.name)
    }
  }, [fetchedTournamentData])

  if (!fetchedTournamentData) {
    return <CircularProgress />
  }

  const handleTournamentNameEdit = (event: React.ChangeEvent<{ value: unknown }>) => {
    const name = event.target.value as string;
    setTournamentName(name);
  }

  const changeTournamentName = () => {
    if (fetchedTournamentData.name !== tournamentName) {
      dispatch(entityActions.editTournament({ id: tournamentId, name: tournamentName }));
    }
  }

  const handleNumberOfGoalsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let value = event.target.value as number;
    if (value < formMinMaxValues.minTables) {
      value = 1;
    }
    if (value > formMinMaxValues.maxTables) {
      value = formMinMaxValues.maxTables;
    }
    value = Math.round(value);
    if (fetchedTournamentData.numberOfGoals !== value) {
      dispatch(entityActions.editTournament({ id: tournamentId, numberOfGoals: value }));
    }
  }

  const handlePointsForWinChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = Math.round(event.target.value as number);
    if (fetchedTournamentData.pointsForWin !== value) {
      dispatch(entityActions.editTournament({ id: tournamentId, pointsForWin: value }));
    }
  }

  const handlePointsForDrawChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = Math.round(event.target.value as number);
    if (fetchedTournamentData.pointsForDraw !== value) {
      dispatch(entityActions.editTournament({ id: tournamentId, pointsForDraw: value }));
    }
  }


  return (
    <>
      <InputLabel className={classes.label}>{t('Tournament Name')}</InputLabel>
      <div className={classes.formBlock}>
        <TextField
          type="text"
          name="tournamentName"
          onChange={handleTournamentNameEdit}
          onBlur={changeTournamentName}
          inputProps={{ min: `${formMinMaxValues.minGoals}`, max: `${formMinMaxValues.maxGoals}`, step: "1" }}
          value={tournamentName}
          autoComplete="off"
          //disabled={formState.goals === GoalValues.Quick}
          className={classes.formTextField}
        />
      </div>
      <InputLabel className={classes.label}>{t('Goals')}</InputLabel>
      <div className={classes.formBlock}>
        <span className={classes.formLabel}>{t('Goals to Win')}</span>
        <FormControlLabel
          // disabled={!formState.goals}
          value={fetchedTournamentData.numberOfGoals}
          label={t('Goal', { count: fetchedTournamentData.numberOfGoals })}
          classes={{ label: classes.formTextFieldSuffix }}
          control={
            <TextField
              id="numberOfGoals"
              type="number"
              name="numberOfGoals"
              onChange={handleNumberOfGoalsChange}
              inputProps={{ min: `${formMinMaxValues.minGoals}`, max: `${formMinMaxValues.maxGoals}`, step: "1" }}
              //defaultValue={formState.numberOfGoals}
              autoComplete="off"
              //disabled={formState.goals === GoalValues.Quick}
              className={classes.formTextField}
            />
          }
        />
      </div>
      <InputLabel className={classes.label}>{t('Points')}</InputLabel>
      <div className={classes.formBlock}>
        <span className={classes.formLabel}>{t('Points for Win')}</span>
        <Select
          name="pointsForWin"
          value={fetchedTournamentData.pointsForWin}
          onChange={handlePointsForWinChange}
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
          { 'disabled': !fetchedTournamentData.draw }
        )}
      >
        <span className={classes.formLabel}>{t('Points for Draw')}</span>
        <Select
          name="pointsFoDraw"
          disabled={!fetchedTournamentData.draw}
          value={fetchedTournamentData.pointsForDraw}
          onChange={handlePointsForDrawChange}
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

      <InputLabel className={classes.label}>{t('Language')}</InputLabel>
      <LanguageSelect />
    </>
  );
}

export default LastManStandingSettings;