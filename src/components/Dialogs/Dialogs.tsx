import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {DialogPageType} from "../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Textarea} from "../common/FormsControls/FormsControls";

type DialogsPropsType = {
    dialogsPage: DialogPageType
    sendMessage: (newMessageBody: string) => void
}

const Dialogs = ({dialogsPage, sendMessage}: DialogsPropsType) => {

    let state =dialogsPage
    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} name={m.name}/>)

    const addNewMessage = (values: FormAddMessageType) => {
        sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogWrap}>
                Dialogs
                <div className={s.dialogsItems}>
                    {dialogsElements}
                </div>
            </div>
            <div className={s.messages}>
                {messagesElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs

type FormAddMessageType = {
    newMessageBody: string
}

const maxLength100 = maxLengthCreator(100)

const AddMessageForm: React.FC<InjectedFormProps<FormAddMessageType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea} name={'newMessageBody'} placeholder={'Enter your message'}
                   validate={[required, maxLength100]}/>
            <button>Send message</button>
        </div>
    </form>

}

const AddMessageFormRedux = reduxForm<FormAddMessageType>({form: 'dialogAddMessageForm'})(AddMessageForm)