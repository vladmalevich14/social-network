import React from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer.";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type mapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type mapDispatchToPropsType = {
    logout: () => void
}
export type userSetAuthDataType = mapStateToPropsType & mapDispatchToPropsType;

class HeaderContainer extends React.Component<userSetAuthDataType> {
    render() {
        return <Header {...this.props} />
    }
}


const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);