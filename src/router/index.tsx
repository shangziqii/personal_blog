import { createHashRouter, Navigate, useParams } from "react-router-dom";
import Index from '../pages/Myblog';
import Personal from "../pages/Personal";
import Login from '../pages/Login'
import Home from "../pages/Home";
import Text from '../pages/Text';
import AuthRoute from "../components/AuthRoute";

// 二级路由
import ArticleClass from './../pages/Home/ArticleClass'
import PublishArticle from './../pages/Home/PublishArticle'
import AddArticle from './../pages/Home/AddArticle'


// 全局路由
export const globalRouters = createHashRouter([
    {
        path: '/index',
        element: <Index />
    },
    {
        path: '/personal',
        element: <AuthRoute element={Personal} />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        // element: <Home />
        element: <AuthRoute element={Home} />,
        children: [
            {
                path: '/home/articleClass',
                element: <ArticleClass />
            },
            {
                path: '/home/publishArticle',
                element: <PublishArticle />
            },
            {
                path: '/home/addArticle',
                element: <AddArticle />
            }
        ]
    },
    {
        path: `/text/:id`,
        element: <Text />
    },
    {
        path: '/',
        element: <Index />
    },
    {
        path: '*',
        element: <Navigate to="/index" />
    }
    /*     {
            path: '/',
            // element: <Home />
            element: (
                <Entry />
            ),
            children: [
                {
                    path: '/change',
                    element: <Change />
                }
            ]
        }, */
    /*     {
            path: '*',
            element: <Navigate to='/index' />
        } */
])