import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import LanguageStore from "../store/LanguageStore";
import {useTranslation} from "react-i18next";

const ToggleLanguageSelect = observer(() => {

    const { i18n } = useTranslation();

    return (
        <div>
            <select
                value={LanguageStore.language}
                onChange={event => {
                    LanguageStore.setLanguage(event.target.value);
                    i18n.changeLanguage(LanguageStore.language)
                }}
            >
                <option disabled value="">Select language</option>
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
