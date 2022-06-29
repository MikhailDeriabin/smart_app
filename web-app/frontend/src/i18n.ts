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
            content: "Content",
            save: "Save",
            settings: "Settings",
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
            title: "Otsikko",
            content: "Sisältö",
            save: "Tallentaa",
            settings: "Asetukset",
            loaded: "Ladattu",
            welcome: "Tervetuloa",
            profile: "Profiili",
            devices: "Laitteet",
            about: "About",
            selectLanguage: "Valitse kieli"
        }
    },
    RU: {
        translation: {
            finnish: "Финский",
            english: "Английский",
            home: "Главная страница",
            exit: "Выход",
            title: "Заголовок",
            content: "Контент",
            save: "Сохранить",
            settings: "Настройки",
            loaded: "Загружено",
            welcome: "Добро пожаловать",
            profile: "Профиль",
            devices: "Устройства",
            about: "О программе",
            selectLanguage: "Выберите язык"
        }
    },
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
