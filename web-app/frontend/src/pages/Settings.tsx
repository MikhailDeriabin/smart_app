import React from 'react';
import ToggleThemeButton from "../components/ToggleThemeButton";
import {useNavigate} from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <ToggleThemeButton/>
            <button onClick={()=>navigate("/")}>Go back</button>
        </div>
    );
};

export default Settings;
