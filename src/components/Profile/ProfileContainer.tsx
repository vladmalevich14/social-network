import React, {ComponentType} from "react";
import Profile from "./Profile";
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {createBrowserHistory} from 'history'
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type ProfileContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
type ProfilePhotosType = {
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
}

export interface WithRouterProps {
    params: Record<string, number>;
}

type MapDispatchToPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
}
type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: null | number
    isAuth: boolean
}
export type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType;
type PropsType = WithRouterProps & OwnPropsType;

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

    componentDidMount() {
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

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatus}/>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile!,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer)