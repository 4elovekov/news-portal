import PersonalAccount from "../pages/PersonalAccount";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";


export const privateRoutes = [
    {path: 'account', element: PersonalAccount},
]

export const publicRoutes = [
    {path: 'login', element: Login},
    {path: 'posts', element: Posts},
    {path: 'posts/:id', element: PostIdPage},
]

export const allRoutes = [
    {path: 'account', element: PersonalAccount},
    {path: 'posts', element: Posts},
    {path: 'posts/:id', element: PostIdPage},
]