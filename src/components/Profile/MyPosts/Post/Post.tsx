import React from "react";
import s from './Post.module.css';
import {ProfileType} from "components/Profile/ProfileContainer";

type PostPropsType = {
    message: string
    likesCount: number
    loginName: string | null
    profile: ProfileType
}

const Post = (props: PostPropsType) => {
    return (
        <div className={s.item}>
            <div className={s.NameAndPhoto}>
                {props.loginName}
            </div>
            <div className={s.message}>
                {props.message}
            </div>

            {/*<div>*/}
            {/*    <span className={s.likes}> {props.likesCount} Likes</span>*/}
            {/*</div>*/}
        </div>
    );
}

export default Post