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

    return <div className={styles.user}>
        <div className={styles.userContainer}>
            <span>
                <div>
                    <NavLink to={'./../profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.photo}
                         alt={'userPhoto'}/>
                        </NavLink>
                </div>

            </span>
            <span>
                <span>
                    <div className={styles.name}>{user.name}</div>
                    <div className={styles.status}><i>{user.status}</i></div>
                </span>
                <span>
                    <div className={styles.wasOnline}>
                        was online {Math.floor(Math.random() * (59 - 1))} minute(s) ago
                    </div>
                </span>
            </span>
        </div>
        <div className={styles.followUnfollow}>
            {user.followed
                ? <button disabled={followingInProgress.some((id: number) => id === user.id)}
                          onClick={() => {
                              unfollow(user.id)
                          }}
                          className={styles.buttonsFollowUnfollow}
                >Unfollow</button>
                :
                <button disabled={followingInProgress.some((id: number) => id === user.id)}
                        onClick={() => {
                            follow(user.id)
                        }}
                        className={styles.buttonsFollowUnfollow}
                >Follow</button>}
        </div>
    </div>
}