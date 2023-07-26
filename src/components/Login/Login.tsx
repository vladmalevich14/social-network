import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "utils/validators/validators";
import {connect} from "react-redux";
import {login} from "redux/auth-reducer.";
import {Navigate} from "react-router-dom";
import {AppStateType} from "redux/redux-store";
import styles from "../common/FormsControls/FormsControls.module.css"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataType> & any> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', Input, [required])}
            {createField('Password', 'password', Input, [required], {type: 'password'})}
            {createField(null, 'rememberMe', Input, [], {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField('Symbols from image', 'captcha', Input, [required])}

            {error && <div className={styles.formSummaryError}>{error}</div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType, any>({form: 'login'})(LoginForm)

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) => void
    isAuth: boolean
    captchaUrl: string | null
}

export const Login = (props: LoginPropsType) => {

    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaUrl)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)