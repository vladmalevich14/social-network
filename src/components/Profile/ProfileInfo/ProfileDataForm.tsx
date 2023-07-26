import React from "react";
import {createField, Input, Textarea} from "components/common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "components/Profile/ProfileContainer";
import s from "components/Profile/ProfileInfo/ProfileInfo.module.css";
import styles from "components/common/FormsControls/FormsControls.module.css";

type ProfileDataFormType = {
    profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormType> & ProfileDataFormType> = ({handleSubmit, error,
                                                                                                                  profile
                                                                                                              }) => {

    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
            {error && <div className={styles.formSummaryError}>{error}</div>}
        </div>
        <div>
            <b>Full name: </b>
            {createField('Full name', 'fullName', Input, [])}
        </div>
        <div>
            <b>Looking for a job: </b>
            {createField('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
        </div>
        <div>
            <b>My skills: </b>
            {createField('', 'lookingForAJobDescription', Textarea, [])}
        </div>
        <div>
            <b>About me: </b>
            {createField('About me', 'aboutMe', Textarea, [])}
        </div>
        <div>
            <b>Contacts: </b>
            {Object.entries(profile.contacts).map(contact => {
                let key = contact[0];
                let value = contact[1];
                return <div key={key} className={s.contact}>
                    <span>{key}: {createField(key, 'contacts.' + key.toLocaleLowerCase(), Input, [])}</span>{value}
                </div>
            })}
        </div>
    </form>
}

export const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileDataFormType>({
    form: 'edit-profile',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileDataForm)

