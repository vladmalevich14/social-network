import React from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {userSetAuthDataType} from "./HeaderContainer";

const Header = (props: userSetAuthDataType) => {
    return (
        <header className={s.header}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Zeronet_logo.png" alt="logo"/>
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header