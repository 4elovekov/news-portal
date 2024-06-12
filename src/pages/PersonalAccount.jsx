import React, {useContext, useState} from 'react';
import {AuthContext, PostsContext} from "../context";
import MyInput from '../components/UI/input/MyInput';
import PostForm from '../components/PostForm';

const PersonalAccount = () => {
    const {role, userName} = useContext(AuthContext);
    const {createPost} = useContext(PostsContext);

    const getMarkup = (role) => {
        console.log("getMarkup", role)
        let result;
        switch (role) {
            case "admin":


            break
            case "user":
                result = <div style={{width: "80%"}}>
                    <PostForm create={createPost}/>
                </div>

            break
            default:

            result = <><h3>Уведомления и комментарии в разработке!</h3><h3>Чтобы воспользоваться другими функциями, смените аккаунт!</h3></>
            break
        }
        return result
    }
    
    return (
        <>
            <h1>
                Личный кабинет {role === "admin" ? "Модератора" : role === "user" ? "Пользователя" : "Автора новостей"}
            </h1>
            <h2>Добро пожаловать, {userName}!</h2>
            {getMarkup(role)}
        </>
    );
};

export default PersonalAccount;