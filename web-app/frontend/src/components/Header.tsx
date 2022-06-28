import React from 'react';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <header className="header">
                <h1>SmartApp</h1>
                <nav>
                    <button onClick={()=>navigate("/settings")}>Settings</button>
                </nav>
            </header>
        </div>
    );
};

export default Header;



