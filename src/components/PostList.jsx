import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove, titleSize, openInEditor}) => {

    if (!posts.length) {
        if (titleSize === "h2") {
            return (
                <h2 style={{textAlign: 'center'}}>
                    На данный момент новости отсутствуют
                </h2>
            )
        } else {
            return (
                <h1 style={{textAlign: 'center'}}>
                    На данный момент новости отсутствуют
                </h1>
            )
        }
    }

    return (
        <div>
            
            {titleSize === "h2"
            ?
            title && <h2 style={{textAlign: 'center'}}>
                {title}
            </h2>
            :
            title && <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>}
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={400}
                        classNames="post"
                    >
                        <PostItem remove={remove} number={index + 1} post={post} openInEditor={openInEditor}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;