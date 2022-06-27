import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { ReactComponent as Menu } from '../img/menu_FILL0_wght400_GRAD0_opsz48.svg'
import navClasses from './NavBar.module.css';

const NavBar = () => {
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
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/devices'>Devices</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default NavBar;



