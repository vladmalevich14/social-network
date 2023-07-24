import React from "react";
import styles from "./FormsControls.module.css"
import {Field} from "redux-form";

const FormControl = ({meta: {touched, error}, children}: any) => {
    const hasError = touched && error
    return <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const Textarea = (props: any)  => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
}

export const Input = (props: any ) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}

export const createField = (placeholder: string | null, name: string, component: any, validate: any[], props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder} name={name} component={component} validate={validate} {...props} /> {text}
    </div>
)