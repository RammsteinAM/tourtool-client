import React, { useEffect, useState, useCallback } from 'react';
import LanguageSelect from '../LanguageSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { formMinMaxValues } from '../../utils/constants';
import { entityActions } from '../../redux/tournamentEntities/actions';
import { debounce } from 'lodash';
import settingsStyles from './settingsStyles';

const EliminationSettings = () => {
  const [tournamentName, setTournamentName] = useState<string>('');
  const [numberOfGoals, setNumberOfGoals] = useState<number>();
  const entityState = useSelector((state: RootState) => state.entities);
  const dispatch = useDispatch();
  const { tournamentId: tournamentIdString } = useParams<{ tournamentId: string }>();
  const tournamentId = parseInt(tournamentIdString, 10);
  const fetchedTournamentData = entityState.fetchedTournaments.data[tournamentId];
  const classes = settingsStyles();
  const { t } = useTranslation();

  useEffect(() => {
    if (fetchedTournamentData) {
      setTournamentName(fetchedTournamentData.name)
      setNumberOfGoals(fetchedTournamentData.numberOfGoals)
    }
  }, [fetchedTournamentData])

  const delayedEditTournament = useCallback(
    debounce((numberOfGoals) => dispatch(entityActions.editTournament({ id: tournamentId, numberOfGoals })), 1000),
    [fetchedTournamentData.numberOfGoals]
  );

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
      setNumberOfGoals(value)
      delayedEditTournament(value)
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
          fullWidth
          inputProps={{ min: `${formMinMaxValues.minGoals}`, max: `${formMinMaxValues.maxGoals}`, step: "1" }}
          value={tournamentName}
          autoComplete="off"
          className={classes.formTextField}
        />
      </div>
      {(fetchedTournamentData.numberOfGoals && fetchedTournamentData.numberOfGoals > 0) ?
        <>
          <InputLabel className={classes.label}>{t('Goals')}</InputLabel>
          <div className={classes.formBlock}>
            <span className={classes.formLabel}>{t('Goals to Win')}</span>
            <FormControlLabel
              value={numberOfGoals}
              label={t('Goal', { count: numberOfGoals })}
              classes={{ label: classes.formTextFieldSuffix }}
              control={
                <TextField
                  id="numberOfGoals"
                  type="number"
                  name="numberOfGoals"
                  onChange={handleNumberOfGoalsChange}
                  inputProps={{ min: `${formMinMaxValues.minGoals}`, max: `${formMinMaxValues.maxGoals}`, step: "1" }}
                  autoComplete="off"
                  className={classes.formTextFieldSmall}
                />
              }
            />
          </div>
        </> : null
      }

      <InputLabel className={classes.label}>{t('Language')}</InputLabel>
      <LanguageSelect />
    </>
  );
}


export default EliminationSettings;