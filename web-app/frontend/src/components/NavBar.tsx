import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { ReactComponent as Menu } from '../img/menu_FILL0_wght400_GRAD0_opsz48.svg'
import navClasses from './NavBar.module.css';
import {useTranslation} from "react-i18next";

const NavBar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    console.log(visible)
    return (
        <nav className={navClasses.navbar}>
            <div className={navClasses.navbar_container}>
                <button onClick={()=>setVisible(!visible)} className={navClasses.hamburger_lines}>
                    <Menu className={navClasses.menuburger}/>
                </button>
                <h1 className={navClasses.title}>Smart App</h1>
            </div>
            <div>
                {
                    visible ?
                        <div onClick={()=>setVisible(false)} className={navClasses.menu}/> : null
                }
                <ul className={`${navClasses.menuitems} ` + (visible ? `${navClasses.visible}`: `${navClasses.invisible}`)}>
                    <li onClick={()=>navigate("/profile")}>
                        {t('profile')}
                    </li>
                    <li onClick={()=>navigate("/devices")}>
                        {t('devices')}
                    </li>
                    <li onClick={()=>navigate("/settings")}>
                        {t('settings')}
                    </li>
                    <li onClick={()=>navigate("/about")}>
                        {t('about')}
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default NavBar;



