import React from 'react';
import LanguageSelect from '../LanguageSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { useTranslation } from "react-i18next";
import settingsStyles from './settingsStyles';

const Settings = () => {
  const classes = settingsStyles();


  const { t } = useTranslation();
  return (
    <>
      <InputLabel className={classes.label}>{t('Language')}</InputLabel>
      <LanguageSelect />
    </>
  );
}

export default Settings;