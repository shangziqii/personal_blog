import { createHashRouter, Navigate } from "react-router-dom";
import Index from '../pages/Index';
import Personal from "../pages/Personal";
import Login from '../pages/Login'
import Home from "../pages/Home";
import Text from '../pages/Text'
import One from '../pages/One'

// 全局路由
export const globalRouters = createHashRouter([
    {
        path: '/index',
        element: <Index />
    },
    {
        path: '/personal',
        element: <Personal />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/text',
        element: (
            <Text />
        ),
        children: [
            {
                path: "one",
                element: <One />
            }
        ]
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