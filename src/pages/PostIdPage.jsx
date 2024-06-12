import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
        // eslint-disable-next-line
    }, []);

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", maxWidth:"80vw"}}>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {isLoading && isComLoading
                ?   <Loader/>
                :   <>
                        {error
                            ?   <h2>Произошла ошибка при загрузке поста</h2>
                            :   <>
                                    <h2 style={{display:"flex", justifyContent:"center"}}>{post.id}. {post.title}</h2>
                                    {comError
                                        ?   <h2>Произошла ошибка при загрузке комментариев</h2>
                                        :   <>
                                                <h3>Комментарии</h3>
                                                <div>
                                                    {comments.map(comm =>
                                                        <div key={comm.id} style={{marginTop: 15}}>
                                                            <h4>{comm.email}</h4>
                                                            <div>{comm.body}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                    }
                                </>
                        }
                    </>
            }
        </div>
    );
};

export default PostIdPage;