import React from "react";
import {connect} from "react-redux";
import {
    follow, requestUsers, initialStateType,
    setCurrentPage, toggleFollowingProgress, unfollow
} from "../../redux/users-reducer.";
import {AppStateType} from "../../redux/redux-store";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getUsers,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount
} from "../../redux/users-selectors";

type mapStateToPropsType = {
    state: initialStateType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: []
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (currentPage: number) => void
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
export type UsersAPIComponentPropsType = mapStateToPropsType & mapDispatchToPropsType

class UsersContainer extends React.Component<UsersAPIComponentPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanger = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize);
        this.props.setCurrentPage(pageNumber);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanger={this.onPageChanger}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                state={this.props.state}
                followingInProgress={this.props.followingInProgress}
            />}

        </>
    }
}

function mapStateToProps(state: AppStateType): mapStateToPropsType {
    return {
        state: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.FC>(connect(mapStateToProps, {
    follow, unfollow, setCurrentPage,
    toggleFollowingProgress, getUsers: requestUsers
}), withAuthRedirect)(UsersContainer)

