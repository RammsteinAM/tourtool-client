import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import languageSelectStyles from './languageSelectStyles';
import i18n, { updateAxiosLocale } from '../../utils/i18n';
import { useTranslation } from "react-i18next";
import mainStyles from '../../styles/mainStyles';

interface Props {

}

export type AppLanguages = 'en' | 'hy' | 'ru';

export enum AppLanguageNames {
    English = 'en',
    Armenian = 'hy',
    Russian = 'ru'
}

const LanguageSelect = (props: Props) => {
    const mainClasses = mainStyles();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        //console.log()
        i18n.changeLanguage(event.target.value as string);
        localStorage.setItem('i18nextLng', event.target.value as string);
        updateAxiosLocale();
    };

    const { t } = useTranslation();
    const currentLanguage: string = i18n.language.substring(0, 2);
    return (
        <div>
            <InputLabel id="demo-simple-select-label">{t('Language')}</InputLabel>
            <Select
                fullWidth
                value={currentLanguage}
                onChange={handleChange}                
                className={mainClasses.select}
            >
                <MenuItem value={'en'}>{t('English')}</MenuItem>
                <MenuItem value={'hy'}>{t('Armenian')}</MenuItem>
                <MenuItem value={'ru'}>{t('Russian')}</MenuItem>
            </Select>
        </div>
    )
}

export default LanguageSelect
