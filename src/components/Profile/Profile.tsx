import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";
import {FilePhotoType} from "redux/profile-reducer";

type ProfilePropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: FilePhotoType) => void
    saveProfile: (formData: ProfileType) => Promise<'pending' | 'fulfilled' | 'rejected'>
}

const Profile = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner} savePhoto={savePhoto} saveProfile={saveProfile}/>
            <MyPostsContainer />
        </div>
    );
}

export default Profile

