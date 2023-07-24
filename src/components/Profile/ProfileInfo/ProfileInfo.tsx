import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/user.png";
import {FilePhotoType, saveProfile} from "redux/profile-reducer";
import {ProfileDataFormReduxForm} from "components/Profile/ProfileInfo/ProfileDataForm";
import profile from "components/Profile/Profile";


type ProfileInfoPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: FilePhotoType) => void
    saveProfile: (formData: ProfileType) => Promise<'pending' | 'fulfilled' | 'rejected'>
}

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}: ProfileInfoPropsType) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            savePhoto(e.target.files[0])
        }
    }
    const goToEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(
            () => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto} src={profile.photos.large || userPhoto}
                     alt="avatar"/>
                {isOwner && <input type={'file'} onChange={mainPhotoSelected}/>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                {editMode ? <ProfileDataFormReduxForm initialValues={profile}
                                                      profile={profile}
                                                      onSubmit={onSubmit}/> :
                    <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode}/>}
            </div>
        </div>
    );
}

const ProfileData = (props: { profile: ProfileType, isOwner: boolean, goToEditMode: () => void }) => {
    const {profile, isOwner, goToEditMode} = props
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div><b>Full name: </b>{profile.fullName}</div>
        <div><b>Looking for a job: </b> {profile.lookingForAJob ? 'yes' : 'no'}</div>
        {profile.lookingForAJob && <div><b>My skills: </b> {profile.lookingForAJobDescription}</div>}
        <div><b>About me: </b>{profile.aboutMe}</div>
        <div>
            <b>Contacts: </b>
            {Object.entries(profile.contacts).map(contact => {
                let key = contact[0];
                let value = contact[1];
                return <Contact key={key} contactTitle={key} contactValue={value}/>
            })}
        </div>
    </div>
}

type ContactType = {
    contactTitle: string
    contactValue: string
}

export const Contact = (props: ContactType) => {
    return <div className={s.contact}><span>{props.contactTitle}: </span>{props.contactValue}</div>
}

export default ProfileInfo