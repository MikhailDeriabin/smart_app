import React from 'react';
import {observer} from "mobx-react-lite";
import ThemeStore from "../store/ThemeStore";

const ToggleThemeButton = observer( () => {
    return (
        <div>
            <button onClick={()=>{
                ThemeStore.setTheme()
            } }>
                {
                    ThemeStore.theme === "light" ? "Light mode" : "Dark Mode"
                }
            </button>
        </div>
    );
});

export default ToggleThemeButton;
