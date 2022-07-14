import {useState} from 'react';
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
                {
                    visible ?
                        <div onClick={()=>setVisible(false)} className={navClasses.menu_Background}/> : null
                }
                <div className={`${navClasses.menu} ` + (visible ? `${navClasses.visible}`: `${navClasses.invisible}`)}>
                    <ul className={navClasses.menuitems}>
                        <li onClick={()=>navigate("/")}>
                            {t('home')}
                        </li>
                        <li onClick={()=>navigate("/devices")}>
                            {t('devices')}
                        </li>
                        <li onClick={()=>navigate("/groups")}>
                            {t('groups')}
                        </li>
                        <div className={navClasses.separator}/>
                        <li onClick={()=>navigate("/settings")}>
                            {t('settings')}
                        </li>
                        <li onClick={()=>navigate("/about")}>
                            {t('about')}
                        </li>
                    </ul>
                    <p className={navClasses.version}>version Alpha 0.1.0</p>
                </div>
        </nav>
    );
};
export default NavBar;



