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
        setIsLoading(false)
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        //setModal(false)
    }

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
                createPost
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
