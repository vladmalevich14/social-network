import React, {ComponentType} from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from 'react-router-dom';
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import store, {AppStateType} from "./redux/redux-store";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer, {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer.";
import Preloader from "./components/common/Preloader/Preloader";

type mapDispatchToPropsType = {
    initializeApp: () => void
}
type mapStateToPropsType = {
    initialized: boolean
}
type InitializedType = mapDispatchToPropsType & mapStateToPropsType

class App extends React.Component<InitializedType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
    if(!this.props.initialized) {
        return <Preloader />
    }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar store={store}/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route element={<ProfileContainer/>} path={'/profile'}>
                            <Route element={<ProfileContainer/>} path={':userId'}/>
                        </Route>
                        <Route element={<DialogsContainer/>} path={'/dialogs*'}/>
                        <Route element={<News/>} path={'/news'}/>
                        <Route element={<Music/>} path={'/music'}/>
                        <Route element={<Settings/>} path={'/settings'}/>
                        <Route element={<UsersContainer/>} path={'/users'}/>
                        <Route element={<Login/>} path={'/login'}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state:AppStateType): mapStateToPropsType => ({
    initialized: state.app.initialized
})

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);