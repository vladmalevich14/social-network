import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {userSetAuthDataType} from "./HeaderContainer";

const Header = (props: userSetAuthDataType) => {
    return (
        <header className={s.header}>
            <div className={s.logoContainer}>
                <NavLink to='/' className={s.link}>
                    <img
                        src="https://wordpress.iqonic.design/product/wp/socialv/wp-content/themes/socialv-themes/assets/images/logo-mini.svg"
                        alt="logo" className={s.logo}/>
                    Social Network
                </NavLink>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div>{props.login} - <button onClick={props.logout} className={s.button}>Log out</button></div> :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header