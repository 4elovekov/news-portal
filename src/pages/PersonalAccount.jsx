import React, {useContext} from 'react';
import {AuthContext, PostsContext} from "../context";
import PostForm from '../components/PostForm';
import PostList from "../components/PostList";

const PersonalAccount = () => {
    const {role, userName} = useContext(AuthContext);
    const {postsInModeration, setPostsInModeration, createPostInModeration} = useContext(PostsContext);

    const removePostFromModeration = (post) => {
        setPostsInModeration(postsInModeration.filter(p => p.id !== post.id))
    }

    const getMarkup = (role) => {
        let result;
        switch (role) {
            case "admin":
                result = <PostList 
                            remove={removePostFromModeration}
                            posts={postsInModeration} 
                            title="Новости на модерации" 
                            titleSize="h2"
                            openInEditor="true"
                        />
            break
            case "author":
                result = <div style={{width: "80%"}}>
                    <PostForm create={createPostInModeration}/>
                </div>
            break
            default:

            result = <><h3>Уведомления и комментарии в разработке!</h3><h3>Чтобы воспользоваться другими функциями, смените аккаунт!</h3></>
            break
        }
        return result
    }
    
    return (
        <div className='account'>
            <h1>
                Личный кабинет {role === "admin" ? "Модератора" : role === "user" ? "Пользователя" : "Автора новостей"}
            </h1>
            <h2>Добро пожаловать, {userName}!</h2>
            {getMarkup(role)}
        </div>
    );
};

export default PersonalAccount;