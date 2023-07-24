import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import {PostType} from "redux/store";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "utils/validators/validators";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";

type MyPostsPropsType = {
    posts: Array<PostType>
    addPost: (value: string) => void
}

const MyPosts = React.memo(({posts, addPost}: MyPostsPropsType) => {

    let postElement = posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)

    const AddPost = (values: AddPostFormType) => addPost(values.newPostText)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
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

const maxLength10 = maxLengthCreator(10)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField(null, 'newPostText', Textarea, [required, maxLength10])}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const AddPostFormRedux = reduxForm<AddPostFormType>({form: 'AddPostForm'})(AddPostForm)