import React from "react";
import {InitialStateType, sendMessageCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

export type mapStateToPropsType = {
    dialogsPage: InitialStateType
}
type mapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        sendMessage: (newMessageBody) => dispatch(sendMessageCreator(newMessageBody))
    }
}

export default compose<React.FC>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
