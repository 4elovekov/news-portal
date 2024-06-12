import React, {useEffect, useState} from "react";
import "./styles/App.css";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import {AuthContext, PostsContext} from "./context";
import AppRouter from "./components/AppRouter";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [role, setRole] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [posts, setPosts] = useState([])
    const [postsInModeration, setPostsInModeration] = useState([])
    const [postsInRevision, setPostsInRevision] = useState([])

    useEffect(() => {
        if(localStorage.getItem("auth")) {
            setIsAuth(true)
        }
        if(localStorage.getItem("userName")) {
            setUserName(localStorage.getItem("userName"))
        }
        if(localStorage.getItem("role")) {
            setRole(localStorage.getItem("role"))
        }
        if(localStorage.getItem("posts")) {
            setPosts(JSON.parse(localStorage.getItem("posts")))
        }
        if(localStorage.getItem("postsInModeration")) {
            setPostsInModeration(JSON.parse(localStorage.getItem("postsInModeration")))
        }
        setIsLoading(false)
    }, []);
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setPostsInModeration(postsInModeration.filter(p => p.id !== newPost.id))
        setPostsInRevision(postsInRevision.filter(p => p.id !== newPost.id))
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts))
    }, [posts])

    const createPostInModeration = (newPost) => {
        setPostsInModeration([...postsInModeration, newPost])
        setPosts(posts.filter(p => p.id !== newPost.id))
        setPostsInRevision(postsInRevision.filter(p => p.id !== newPost.id))
    }

    useEffect(() => {
        localStorage.setItem("postsInModeration", JSON.stringify(postsInModeration))
    }, [postsInModeration])

    const createPostInRevision = (newPost) => {
        setPostsInRevision([...postsInRevision, newPost])
        setPosts(posts.filter(p => p.id !== newPost.id))
        setPostsInModeration(postsInModeration.filter(p => p.id !== newPost.id))
    }

    useEffect(() => {
        localStorage.setItem("postsInRevision", JSON.stringify(postsInRevision))
    }, [postsInRevision])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            role,
            setRole,
            userName,
            setUserName,
        }}>
            <PostsContext.Provider value={{
                posts,
                setPosts,
                postsInModeration,
                setPostsInModeration,
                postsInRevision,
                setPostsInRevision,
                createPost,
                createPostInModeration,
                createPostInRevision,
                removePost
            }}>
                <BrowserRouter>
                    <Navbar />
                    <AppRouter/>
                </BrowserRouter>
            </PostsContext.Provider>
        </AuthContext.Provider>
    )
}

export default App;
