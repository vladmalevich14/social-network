import React from "react";
import s from './Post.module.css';

 type PostPropsType = {
     message: string
     likesCount: number
 }

const Post = (props: PostPropsType) => {
    return (
                <div className={s.item}>
                    <img src="https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg" alt=""/>
                    {props.message}
                    <div>
                    <span> {props.likesCount} Likes</span>
                    </div>
                </div>
    );
}

export default Post