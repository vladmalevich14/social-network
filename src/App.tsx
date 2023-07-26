import React, {ComponentType, lazy, Suspense} from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import store, {AppStateType} from "./redux/redux-store";
import UsersContainer from "./components/Users/UsersContainer";
import {withRouter} from "components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "redux/app-reducer.";
import Preloader from "./components/common/Preloader/Preloader";

const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));

type mapDispatchToPropsType = {
    initializeApp: () => void
}
type mapStateToPropsType = {
    initialized: boolean
}
type InitializedType = mapDispatchToPropsType & mapStateToPropsType

class App extends React.Component<InitializedType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        alert('Some error occurred')
        console.log(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar store={store}/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route element={<Navigate to='/profile'/>} path={'/'}/>
                            <Route element={<ProfileContainer/>} path={'/profile'}>
                                <Route element={<ProfileContainer/>} path={':userId'}/>
                            </Route>
                            <Route element={<DialogsContainer/>} path={'/dialogs/*'}/>
                            <Route element={<News/>} path={'/news'}/>
                            <Route element={<Music/>} path={'/music'}/>
                            <Route element={<Settings/>} path={'/settings'}/>
                            <Route element={<UsersContainer/>} path={'/users'}/>
                            <Route element={<Login/>} path={'/login'}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

export const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}