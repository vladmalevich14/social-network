import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../assets/img/user.png";
import {UserType} from "redux/users-reducer.";
import {NavLink} from "react-router-dom";

type UserPropsType = {
    user: UserType
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: []
}

export const User = ({user, followingInProgress, unfollow, follow}: UserPropsType) => {
    return <div>
            <span>
                <div>
                    <NavLink to={'./../profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.photo} alt={'userPhoto'}/>
                        </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some((id: number) => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}
                        >Unfollow</button>
                        :
                        <button disabled={followingInProgress.some((id: number) => id === user.id)}
                                onClick={() => {
                                    follow(user.id)
                                }}
                        >Follow</button>}
                </div>
            </span>
        <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </span>
            </span>
    </div>
}