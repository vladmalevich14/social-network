import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "redux/store";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "utils/validators/validators";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";
import {ProfileType} from "components/Profile/ProfileContainer";

type MyPostsPropsType = {
    posts: Array<PostType>
    addPost: (value: string) => void
    loginName: string | null
    profile: ProfileType
}

const MyPosts = React.memo(({posts, addPost, loginName, profile}: MyPostsPropsType) => {

    let postElement = posts.map(p => <Post profile={profile} loginName={loginName} message={p.message}
                                           likesCount={p.likesCount} key={p.id}/>)

    const AddPost = (values: AddPostFormType) => addPost(values.newPostText)

    return (
        <div className={s.postsBlock}>
            <h3 className={s.postsTitle}>My posts</h3>
            <AddPostFormRedux onSubmit={AddPost}/>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
})

export default MyPosts

type AddPostFormType = {
    newPostText: string
}

const minLength = minLengthCreator(1)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={s.addPostWrapper}>
            {createField(null, 'newPostText', Textarea, [required, minLength])}
            <div>
                <button className={s.button}>Add post</button>
            </div>
        </div>
    </form>
}

const AddPostFormRedux = reduxForm<AddPostFormType>({form: 'AddPostForm'})(AddPostForm)