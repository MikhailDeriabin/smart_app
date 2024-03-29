import {observer} from "mobx-react-lite";
import LanguageStore from "../store/LanguageStore";
import {useTranslation} from "react-i18next";

const ToggleLanguageSelect = observer(() => {

    const { t,i18n } = useTranslation();

    return (
        <div>
            <select
                value={LanguageStore.language}
                onChange={event => {
                    LanguageStore.setLanguage(event.target.value);
                    i18n.changeLanguage(event.target.value);
                }}
            >
                <option disabled value="">{t("selectLanguage")}</option>
                {LanguageStore.languages.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    );
});

export default ToggleLanguageSelect;
