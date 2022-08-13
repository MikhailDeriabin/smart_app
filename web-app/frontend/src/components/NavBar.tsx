import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ReactComponent as Menu} from '../img/menu_FILL0_wght400_GRAD0_opsz48.svg'
import {ReactComponent as Home} from '../img/home_FILL0_wght400_GRAD0_opsz48.svg'
import {ReactComponent as Devices} from '../img/devices_other_FILL0_wght400_GRAD0_opsz48.svg'
import {ReactComponent as Groups} from '../img/group_work_FILL0_wght400_GRAD0_opsz48.svg'
import {ReactComponent as Settings} from '../img/settings_FILL0_wght400_GRAD0_opsz48.svg'
import {ReactComponent as Info} from '../img/info_FILL0_wght400_GRAD0_opsz48.svg'
import navClasses from './NavBar.module.css';
import {useTranslation} from "react-i18next";

const NavBar = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    console.log(window.location.pathname)
    console.log(window.location.pathname.split("/"))
    return (
        <nav className={navClasses.navbar}>
            <div className={navClasses.navbar_container}>
                {
                    window.location.pathname.split("/").length > 2 ?
                        <button onClick={() => navigate(-1)} className={navClasses.backButton}>
                            <div className={navClasses.arrow}/>
                        </button>
                        :
                        <button onClick={() => setVisible(!visible)} className={navClasses.hamburger_lines}>
                            <Menu fill={`var(--font-secondary-color)`} className={navClasses.menuburger}/>
                        </button>
                }
                <h1 className={navClasses.title}>Smart App</h1>
            </div>
                {
                    visible ?
                        <div onClick={()=>setVisible(false)} className={navClasses.menu_Background}/> : null
                }
                <div className={`${navClasses.menu} ` + (visible ? `${navClasses.visible}`: `${navClasses.invisible}`)}>
                    <ul className={navClasses.menuitems}>
                        <li onClick={()=>navigate("/")}>
                            <Home viewBox="0 0 48 48" fill={`var(--font-secondary-color)`}
                                  className={navClasses.icons}/>
                            {t('home')}
                        </li>
                        <li onClick={()=>navigate("/devices")}>
                            <Devices viewBox="0 0 48 48" fill={`var(--font-secondary-color)`}
                                     className={navClasses.icons}/>
                            {t('devices')}
                        </li>
                        <li onClick={()=>navigate("/groups")}>
                            <Groups viewBox="0 0 48 48" fill={`var(--font-secondary-color)`}
                                    className={navClasses.icons}/>
                            {t('groups')}
                        </li>
                        <div className={navClasses.separator}/>
                        <li onClick={()=>navigate("/settings")}>
                            <Settings viewBox="0 0 48 48" fill={`var(--font-secondary-color)`}
                                      className={navClasses.icons}/>
                            {t('settings')}
                        </li>
                        <li onClick={()=>navigate("/about")}>
                            <Info viewBox="0 0 48 48" fill={`var(--font-secondary-color)`}
                                  className={navClasses.icons}/>
                            {t('about')}
                        </li>
                    </ul>
                    <p className={navClasses.version}>version Alpha 0.1.0</p>
                </div>
        </nav>
    );
};
export default NavBar;



