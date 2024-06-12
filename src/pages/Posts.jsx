import React, {useEffect, useState, useContext} from "react";
import "../styles/App.css";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal"
import {usePosts} from "../hooks/usePosts";
//import Loader from "../components/UI/Loader/Loader"
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { PostsContext } from "../context";
//import {useObserver} from "../hooks/useObserver";

function Posts() {
    const {posts, setPosts, createPost} = useContext(PostsContext);

    // eslint-disable-next-line
    const [limit, setLimit] = useState(10)
    const [filter, setFilter] = useState({sort: "", query: "", defaultSort: "id"})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query, filter.defaultSort)
    //const lastElement = useRef()

    // eslint-disable-next-line
    const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...response.data])
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit));
    })

    /*useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })*/

    useEffect(() => {
        fetchPosts(limit, page);
        // eslint-disable-next-line
    }, [page]);

    // const createPost = (newPost) => {
    //     setPosts([...posts, newPost])
    //     setModal(false)
    // }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <MyButton onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
            {/*<div ref={lastElement} style={{height:"40px"}} />
            {isPostsLoading &&
                <Loader/>
            }*/}
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
