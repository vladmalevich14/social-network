import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {DialogType} from "../../redux/store";
import {StoreType} from "../../redux/redux-store";

type NavbarPropsType = {
    store: StoreType
}

const Navbar = ({store}: NavbarPropsType) => {
    let friendsNav = store.getState().dialogsPage.friends.map((f: DialogType) => {
        return (
            <div className={s.nameFriend} key={f.id}>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                    alt={f.name}/>{f.name}
            </div>
        )
    })
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to='/profile'
                         className={(navData) => navData.isActive ? s.active : s.item}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs'
                         className={(navData) => navData.isActive ? s.active : s.item}>Messages</NavLink>
            </div>
            <div>
                <NavLink to='/users'
                         className={(navData) => navData.isActive ? s.active : s.item}>Users</NavLink>
            </div>
            <div>
                <NavLink to='/news'
                         className={(navData) => navData.isActive ? s.active : s.item}>News</NavLink>
            </div>
            <div>
                <NavLink to='/music'
                         className={(navData) => navData.isActive ? s.active : s.item}>Music</NavLink>
            </div>
            <div>
                <NavLink to='/settings'
                         className={(navData) => navData.isActive ? s.active : s.item}>Settings</NavLink>
            </div>
            <div className={s.friends}>
                <div className={s.nameSection}>Friends</div>
                <div className={s.infoFriends}>
                    {friendsNav}
                </div>
            </div>
        </nav>
    );
}

export default Navbar