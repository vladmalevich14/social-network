import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type DialogItem = {
    id: number
    name: string
}

const DialogItem = (props:DialogItem) => {
    let path = '/dialogs/' + props.id
    return (
        <div>
            <div className={s.dialog}>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                    alt="profile avatar"/>
                <NavLink className={s.navName} to={path}>{props.name}</NavLink>
            </div>
        </div>
    )
}

export default DialogItem