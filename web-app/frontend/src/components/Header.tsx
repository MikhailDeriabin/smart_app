import React from 'react';
import {useNavigate} from "react-router-dom";



const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="header">
                <h1>SmartApp</h1>
                <nav>
                    <button onClick={()=>navigate("/settings")}>Go to settings page</button>
                </nav>
        </header>
    );
};
export default Header;



