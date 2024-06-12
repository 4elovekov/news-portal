import React, { useEffect, useState, useContext } from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom";
import { AuthContext } from '../context';

const PostItem = (props) => {
    const {role} = useContext(AuthContext);
    const navigate = useNavigate()

    const openButtonHandleClick = (id) => {
        if (props.openInEditor === "true") {
            navigate(`/postsEditor/${id}`, { replace: true })
        } else {
            navigate(`/posts/${id}`, { replace: true })
        }
    }

    const [isImgValid, setIsImgValid] = useState(true)

    useEffect(() => {
        const img = new Image();
        img.src = props.post.imgUrl;
        img.onload = () => setIsImgValid(true);
        img.onerror = () => setIsImgValid(false);
    }, [props.post.imgUrl])

    return (
        <div className="post">

            {isImgValid && <div className="post__img">
                <img src={props.post.imgUrl} alt="Preview" />
            </div>}
            <div className="post__content">
                <div className="post__title">
                    <strong>{props.post.title}</strong>
                </div>

                {props.post.tags && <div className="post__tags">
                    {props.post.tags.split(',').map( (item, index) => <p key={index}>{item.trim()}</p>)}
                </div>}

                <div className="post__body">
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => openButtonHandleClick(props.post.id)}>
                    {props.openInEditor === "true" ? "Модерировать" : "Открыть"}
                </MyButton>
                {role === "admin" ?
                <MyButton onClick={() => props.remove(props.post)}>
                    Удалить
                </MyButton>
                : null}
            </div>
        </div>
    );
};

export default PostItem;