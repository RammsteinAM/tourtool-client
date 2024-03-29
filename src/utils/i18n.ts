import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import intervalPlural from 'i18next-intervalplural-postprocessor';
import localizationResources from "./localization";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

i18n
    .use(intervalPlural)
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector) // passes i18n down to react-i18next
    .init({
        resources: localizationResources,
        fallbackLng: "en",
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage'],
            excludeCacheFor: ['cimode'],
        },
        interpolation: {
            escapeValue: false
        }
    });

export const getLocale = () => i18n.language.substring(0, 2) || '';
const locale = getLocale();
export const getLangQuery = () => locale ? `?lang=${locale}` : '';
export const getFullLocale = () => i18n.language;

export const updateAxiosLocale = () => {
    axios.defaults.params = { lang: getLocale() }
}

export default i18n;