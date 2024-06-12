import React, {useEffect, useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import { PostsContext } from "../context";

const PostIdPage = () => {
    const params = useParams()
    const {posts} = useContext(PostsContext);
    const post = posts.find(p => p.id === parseInt(params.id));

    const [isImgValid, setIsImgValid] = useState(true)

    useEffect(() => {
        const img = new Image();
        img.src = post.imgUrl;
        img.onload = () => setIsImgValid(true);
        img.onerror = () => setIsImgValid(false);
    }, [post.imgUrl])

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"80vw"}}>
            <h1 style={{marginBottom: "15px"}} >{post.title}</h1>
            {post.tags && <div style={{marginBottom: "30px"}} className="post__tags">
                    {post.tags.split(',').map( (item, index) => <p key={index}>{item.trim()}</p>)}
                </div>}
            {isImgValid && <img style={{marginBottom: "30px", maxWidth: "300px"}} src={post.imgUrl} alt='Preview'></img>}
            {post.body && <p>{post.body}</p>}
        </div>
    );
};

export default PostIdPage;