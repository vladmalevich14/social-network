import React, {ComponentType} from "react";
import Profile from "./Profile";
import {AppStateType} from "redux/redux-store";
import {connect} from "react-redux";
import {FilePhotoType, getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "redux/profile-reducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {createBrowserHistory} from 'history'
import {withAuthRedirect} from "hoc/withAuthRedirect";

export type ProfileContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type ProfilePhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: ProfilePhotosType
    aboutMe: string
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (photoFile: FilePhotoType) => void
    saveProfile: (formData: ProfileType) => Promise<'pending' | 'fulfilled' | 'rejected'>
}
type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: null | number
    isAuth: boolean
}
export type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType;
type PropsType = WithRouterProps & OwnPropsType;

export interface WithRouterProps {
    params: Record<string, number>;
}

export const withRouter = <Props extends WithRouterProps>(Component: React.ComponentType<Props>) => {
    return (props: Omit<Props, keyof WithRouterProps>) => {
        const params = useParams();

        return (
            <Component
                {...(props as Props)}
                params={params}
            />
        );
    };
};

const history = createBrowserHistory()

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        const {params, authorizedUserId, getUserProfile, getStatus} = this.props
        let userId: number | null = params.userId;
        if (!userId) {
            userId = authorizedUserId;
            if (!userId) {
                history.push('/login')
            }
        }
        getUserProfile(userId)
        getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.params.userId != prevProps.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus} isOwner={!this.props.params.userId}
                     savePhoto={this.props.savePhoto} saveProfile={this.props.saveProfile}/>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage['profile'],
    status: state.profilePage['status'],
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer)