import React, {useEffect, useContext, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import { PostsContext } from "../context";
import MyTextArea from '../components/UI/textArea/MyTextArea';
import MyButton from '../components/UI/button/MyButton';

const PostsEditor = () => {
    const navigate = useNavigate()
    const params = useParams()
    const {postsInModeration, createPostInRevision, createPost} = useContext(PostsContext);
    const post = postsInModeration.find(p => p.id === parseInt(params.id));

    const [isImgValid, setIsImgValid] = useState(true)
    const [comment, setComment] = useState("")

    useEffect(() => {
        const img = new Image();
        img.src = post?.imgUrl;
        img.onload = () => setIsImgValid(true);
        img.onerror = () => setIsImgValid(false);
    }, [post?.imgUrl])

    const publish = (post) => {
        createPost(post)
        navigate(`/posts/`, { replace: true })
    }

    const revision = (post) => {
        createPostInRevision(post)
        navigate(`/account/`, { replace: true })
    }


    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"80vw"}}>
            <h1 style={{marginBottom: "15px"}}>{post?.title}</h1>
            {post?.tags && <div style={{marginBottom: "30px"}} className="post__tags">
                    {post?.tags.split(',').map( (item, index) => <p key={index}>{item.trim()}</p>)}
                </div>}
            {isImgValid && <img style={{marginBottom: "30px", maxWidth: "300px"}} src={post?.imgUrl} alt='Preview'></img>}
            {post?.body && <p>{post?.body}</p>}
            <MyTextArea
                style={{marginTop: "20px"}}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text" 
                placeholder="Опишите недочёты, если они есть"
            />
            <MyButton onClick={() => publish(post)}>
                Опубликовать
            </MyButton>
            <MyButton onClick={() => revision(post)}>
                Отправить на доработку
            </MyButton>
        </div>
    );
};

export default PostsEditor;