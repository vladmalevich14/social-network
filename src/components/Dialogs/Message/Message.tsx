import React from "react";
import s from './../Dialogs.module.css'

type MessagePropsType = {
    message:string
    name:string
}

const Message = (props:MessagePropsType) => {

    return (
        <div>
            <div className={s.message}>
                <img
                    src='https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
                    alt={'logo'} className={s.ava}/>

                <div className={s.textWrap}>
                    <div>
                        <div className={s.name}>{props.name}</div>
                        <div className={s.text}>{props.message}</div>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}

export default Message