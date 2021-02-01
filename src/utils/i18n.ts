import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import localizationResources from "./localization";

i18n
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

export const getLangQuery = () => i18n.language.substring(0, 2) ? `?lang=${i18n.language.substring(0, 2)}` : '';
export const getLocale = () => i18n.language.substring(0, 2) || '';

export default i18n;