import React, {ChangeEvent, useState} from "react";
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../ProfileContainer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/user.png";
import {FilePhotoType, saveProfile} from "redux/profile-reducer";
import {ProfileDataFormReduxForm} from "components/Profile/ProfileInfo/ProfileDataForm";


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
                <div className={s.photoAndStatus}>
                    <div className={s.avatarContainer}>
                        <img className={s.mainPhoto} src={profile.photos.large || userPhoto}
                             alt="avatar"/>
                        {isOwner &&
                            <div className={s.inputWrapper}><input type={'file'} onChange={mainPhotoSelected} className={s.inputAvatar}/></div>}
                    </div>
                    <div className={s.nameEdit}>
                        <b>{profile.fullName}</b>
                    </div>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>

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
    return <div className={s.profileDataContainer}>
        {isOwner && <div className={s.editButton}>
            <button onClick={goToEditMode} className={s.button}>edit</button>
        </div>
        }
        <div className={s.infoProfileContainer}>
            <div className={s.infoContainer}>
                <span className={s.titleInfo}>Looking for a job: </span>
                {profile.lookingForAJob ? 'yes' : 'no'}
            </div>

            {profile.lookingForAJob &&
                <div className={s.infoContainer}>
                    <span className={s.titleInfo}>My skills: </span>
                    <div>
                        {profile.lookingForAJobDescription}
                    </div>
                </div>
            }
            <div className={s.infoContainer}>
                <span className={s.titleInfo}>About me: </span>
                {profile.aboutMe}
            </div>

            <div className={s.infoContainer}>
                <span className={s.titleInfo}>Contacts: </span>
                {Object.entries(profile.contacts).map(contact => {
                    let key = contact[0];
                    let value = contact[1];
                    return <Contact key={key} contactTitle={key} contactValue={value}/>
                })}
            </div>
        </div>
    </div>
}

type ContactType = {
    contactTitle: string
    contactValue: string
}

export const Contact = (props: ContactType) => {
    return <>
        {
            props.contactValue && <div className={s.contact}>• <a href={props.contactValue} className={s.link}
                                                                target={'_blank'}>{props.contactTitle}</a>
            </div>
        }
    </>
}
export default ProfileInfo