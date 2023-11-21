import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {DialogType} from "../../redux/store";
import {StoreType} from "../../redux/redux-store";

type NavbarPropsType = {
    store: StoreType
}

const Navbar = ({store}: NavbarPropsType) => {
    console.log(store.getState().dialogsPage.friends)
    let friendsNav = store.getState().dialogsPage.friends.map((f: DialogType) => {
        return (
            <div className={s.nameAndPhotoFriend} key={f.id}>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                    alt={f.name}/>
                <span className={s.nameFriend}>{f.name}</span>
            </div>
        )
    })
    return (
        <nav className={s.nav}>
            <div className={s.navLinksWrapper}>
            <div className={s.navLinkContainer}>
                <NavLink to='/profile'
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    <span className={s.navLinkName}>Profile</span>
                </NavLink>
            </div>
            <div className={s.navLinkContainer}>
                <NavLink to='/users'
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    <span className={s.navLinkName}>Users</span>
                </NavLink>
            </div>
            <div className={s.navLinkContainer}>
                <NavLink to='/dialogs'
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    <span className={s.navLinkName}>Messages</span>
                </NavLink>
            </div>
            <div className={s.navLinkContainer}>
                <NavLink to='/news'
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    <span className={s.navLinkName}>News</span>
                </NavLink>
            </div>
            <div className={s.navLinkContainer}>
                <NavLink to='/music'
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    <span className={s.navLinkName}>Music</span>
                </NavLink>
            </div>
            <div>
                <NavLink to='/settings'
                         className={(navData) => navData.isActive ? s.active : s.item}>
                    <span className={s.navLinkName}>Settings</span>
                </NavLink>
            </div>
            </div>
            <div className={s.friends}>
                <div className={s.nameSection}>Best friends</div>
                <div className={s.infoFriends}>
                    {friendsNav}
                </div>
            </div>
        </nav>
    );
}

export default Navbar