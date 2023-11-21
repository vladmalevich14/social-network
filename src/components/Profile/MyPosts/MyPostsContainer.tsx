import React from "react";
import {addPostActionCreator, PostType} from "redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "redux/redux-store";
import {Dispatch} from "redux";
import {ProfileType} from "components/Profile/ProfileContainer";

type MapDispatchPropsType = {
    addPost: (value: string) => void
}

type mapStateToPropsType = {
    posts: PostType[]
    loginName: string | null
    profile: ProfileType
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {

    return {
        posts: state.profilePage['posts'],
        loginName: state.auth.login,
        profile: state.profilePage['profile']
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addPost: (value: string) => dispatch(addPostActionCreator(value))
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer