import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    EN: {
        translation: {
            Finnish: "Finnish",
            English: "English",
            home: "Home",
            exit: "Exit",
            title: "title",
            content: "content here",
            save: "Save",
            count: "Count",
            settingsTitle: "Hello from settings",
            startLoading: "Start Loading",
            stopLoading: "Stop Loading",
            loaded: "loaded",
            welcome: "welcome"

        }
    },
    FI: {
        translation: {
            Finnish: "Suomi",
            English: "Englanti",
            home: "Koti",
            exit: "Ulos",
            title: "otsikko",
            content: "sisältö täällä",
            save: "Tallentaa",
            count: "Kreivi",
            settingsTitle: "Terveisiä asetuksista",
            startLoading: "Start Lataus",
            stopLoading: "Stop Lataus",
            loaded: "ladattu",
            welcome: "Tervetuloa"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: "EN",
        interpolation: {
            escapeValue: false
        }
    }).then(r => console.log(r));
