import React, {useState, useContext} from "react";
import "../styles/App.css";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import {usePosts} from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { PostsContext } from "../context";

function Posts() {
    const {posts, setPosts, removePost} = useContext(PostsContext);

    // eslint-disable-next-line
    const [limit, setLimit] = useState(10)
    const [filter, setFilter] = useState({sort: "", query: "", defaultSort: "id"})
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query, filter.defaultSort)

    // eslint-disable-next-line
    const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...response.data])
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit));
    })

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Последние новости"/>
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
