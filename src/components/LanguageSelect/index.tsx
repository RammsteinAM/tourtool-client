import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import i18n, { updateAxiosLocale, getFullLocale } from '../../utils/i18n';
import { useTranslation } from "react-i18next";
import mainStyles from '../../styles/mainStyles';

const LanguageSelect = () => {
    const mainClasses = mainStyles();
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        //console.log()
        i18n.changeLanguage(event.target.value as string);
        localStorage.setItem('i18nextLng', event.target.value as string);
        updateAxiosLocale();
    };

    const { t } = useTranslation();
    const currentLanguage: string = getFullLocale();
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
                <MenuItem value={'hy-am'}>{t('Armenian')}</MenuItem>
                <MenuItem value={'ru'}>{t('Russian')}</MenuItem>
            </Select>
        </div>
    )
}

export default LanguageSelect
