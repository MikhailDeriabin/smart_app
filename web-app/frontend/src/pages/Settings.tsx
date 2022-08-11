import ToggleThemeButton from "../components/ToggleThemeButton";
import ToggleLanguageSelect from "../components/ToggleLanguageSelect";
import classes from "./Settings.module.css";
import {useTranslation} from "react-i18next";
import ToggleButton from "../components/ToggleButton";
import ThemeStore from "../store/ThemeStore";

const Settings = () => {
    const {t} = useTranslation();

    function handleClick() {
        ThemeStore.setTheme()
    }

    return (
        <div className={classes.container}>
            <h1>{t('settings')}</h1>
            <ToggleThemeButton/>
            <ToggleButton handleClick={handleClick}></ToggleButton>
            <ToggleLanguageSelect/>
            <div className="test">hello</div>
        </div>
    );
};

export default Settings;
