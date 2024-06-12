import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import MyTextArea from './UI/textArea/MyTextArea';

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: '', imgUrl: '', tags: ''})


    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: '', imgUrl: '', tags: ''})
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPost({...post, imgUrl: url})
        }
    };

    return (
        <form style={{display: "flex", flexDirection: "column", minWidth: "360px"}}>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Заголовок новости"
            />
            <MyInput
                onChange={handleFileChange}
                type="file"
                accept="image/*"
            />
            {post.imgUrl && <img style={{maxWidth: "200px", maxHeight: "200px", height: "auto", width: "auto", objectFit: "cover"}} src={post.imgUrl} alt="Preview" />}
            <MyTextArea
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Текст новости"
            />
            <MyInput
                value={post.tags}
                onChange={e => setPost({...post, tags: e.target.value})}
                type="text"
                placeholder="Теги через запятую"
            />
            <MyButton onClick={addNewPost}>Создать новость</MyButton>
        </form>
    );
};

export default PostForm;