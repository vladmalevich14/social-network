import React, {ComponentType} from "react";
import {AppStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

type MapStateToPropsForRedirectType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStateToPropsForRedirectType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export function withAuthRedirect(Component: ComponentType) {

    const RedirectComponent = (props: MapStateToPropsForRedirectType) => {

        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to={'/login'}/>

        return <Component {...restProps} />;
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}