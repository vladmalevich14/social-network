import React from "react";
import s from "./Users.module.css"
import {initialStateType} from "../../redux/users-reducer.";
import Paginator from "../common/Paginator/Paginator";
import {User} from "./User";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanger: (p: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    state: initialStateType
    followingInProgress: []
}

const Users = ({
                   onPageChanger,
                   currentPage,
                   pageSize,
                   totalUsersCount,
                   state,
                   followingInProgress,
                   unfollow,
                   follow
               }: UsersPropsType) => {

    return <div>

        <Paginator currentPage={currentPage} onPageChanger={onPageChanger} totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div className={s.users}>
            {state.users.map(u => <User key={u.id} user={u} followingInProgress={followingInProgress}
                                        unfollow={unfollow}
                                        follow={follow}/>
            )}
        </div>
    </div>
}

export default Users;