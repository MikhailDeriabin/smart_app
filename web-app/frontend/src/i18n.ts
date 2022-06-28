import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageStore from "./store/LanguageStore";

const currentLanguage = LanguageStore.language

const resources = {
    EN: {
        translation: {
            finnish: "Finnish",
            english: "English",
            home: "Home",
            exit: "Exit",
            title: "title",
            content: "content here",
            save: "Save",
            count: "Count",
            settings: "Settings",
            startLoading: "Start Loading",
            stopLoading: "Stop Loading",
            loaded: "loaded",
            welcome: "welcome",
            profile: "Profile",
            devices: "Devices",
            about: "About",
            selectLanguage: "Select language"
        }
    },
    FI: {
        translation: {
            finnish: "Suomi",
            english: "Englanti",
            home: "Koti",
            exit: "Ulos",
            title: "otsikko",
            content: "sisältö täällä",
            save: "Tallentaa",
            count: "Kreivi",
            settings: "Asetukset",
            startLoading: "Start Lataus",
            stopLoading: "Stop Lataus",
            loaded: "ladattu",
            welcome: "Tervetuloa",
            profile: "Profiili",
            devices: "Laitteet",
            about: "About",
            selectLanguage: "Valitse kieli"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: currentLanguage,
        interpolation: {
            escapeValue: false
        }
    }).then(r => console.log(r));
