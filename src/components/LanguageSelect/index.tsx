import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import languageSelectStyles from './languageSelectStyles';
import i18n from '../../utils/i18n';
import { useTranslation } from "react-i18next";

interface Props {

}

export type AppLanguages = 'en' | 'hy' | 'ru';

export enum AppLanguageNames {
    English = 'en',
    Armenian = 'hy',
    Russian = 'ru'
}

const LanguageSelect = (props: Props) => {
    const classes = languageSelectStyles();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        //console.log()
        i18n.changeLanguage(event.target.value as string);
        localStorage.setItem('i18nextLng', event.target.value as string);
    };

    const { t } = useTranslation();
    const currentLanguage: string = i18n.language.substring(0, 2);
    return (
        <div>
            <InputLabel id="demo-simple-select-label">{t('Language')}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentLanguage}
                onChange={handleChange}
            >
                <MenuItem value={'en'}>{t('English')}</MenuItem>
                <MenuItem value={'hy'}>{t('Armenian')}</MenuItem>
                <MenuItem value={'ru'}>{t('Russian')}</MenuItem>
            </Select>
        </div>
    )
}

export default LanguageSelect
