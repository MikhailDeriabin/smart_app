import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { ReactComponent as Menu } from '../img/menu_FILL0_wght400_GRAD0_opsz48.svg'
import Home  from '../img/home_FILL0_wght400_GRAD0_opsz48.svg'
import Devices  from '../img/devices_other_FILL0_wght400_GRAD0_opsz48.svg'
import Groups  from '../img/group_work_FILL0_wght400_GRAD0_opsz48.svg'
import Settings  from '../img/settings_FILL0_wght400_GRAD0_opsz48.svg'
import Info  from '../img/info_FILL0_wght400_GRAD0_opsz48.svg'
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
                            <img alt={"House"} src={Home}/>
                            {t('home')}
                        </li>
                        <li onClick={()=>navigate("/devices")}>
                            <img alt={"Couple devices"} src={Devices}/>
                            {t('devices')}
                        </li>
                        <li onClick={()=>navigate("/groups")}>
                            <img alt={"Three dots inside circle"} src={Groups}/>
                            {t('groups')}
                        </li>
                        <div className={navClasses.separator}/>
                        <li onClick={()=>navigate("/settings")}>
                            <img alt={"Gear"} src={Settings}/>
                            {t('settings')}
                        </li>
                        <li onClick={()=>navigate("/about")}>
                            <img alt={"Exclamation mark inside circle"} src={Info}/>
                            {t('about')}
                        </li>
                    </ul>
                    <p className={navClasses.version}>version Alpha 0.1.0</p>
                </div>
        </nav>
    );
};
export default NavBar;



