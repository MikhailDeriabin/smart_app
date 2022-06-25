import React from 'react';
import {observer} from "mobx-react-lite";
import ThemeStore from "../store/ThemeStore";

const ToggleThemeButton = observer( () => {
    return (
        <div>
            <button onClick={()=>ThemeStore.toggleTheme() }>
                {
                    ThemeStore.currentTheme === "light" ? "Light mode" : "Dark Mode"
                }
            </button>
        </div>
    );
});

export default ToggleThemeButton;
