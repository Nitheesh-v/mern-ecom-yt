import { RouterProvider, createBrowserRouter } from "react-router-dom"
import React from "react";
import Home from "../Home/Home";

import AuthLayout from "../components/Auth/layout";
import { Login } from "../Pages/Auth/login";
import  Register  from "../Pages/Auth/register";

import { AdminLayout } from "../components/Admin/AdminLayout";
import { Dashboard } from "../Pages/Admin/Dashboard";
import { Orders } from './../Pages/Admin/Orders';
import { Features } from './../Pages/Admin/Features';
import { Products } from './../Pages/Admin/Products';

import { Shoplayout } from "../components/Shopping-view/Shoplayout";
import { Listing } from "../Pages/Shopping-view/Listing";
import Checkout from "../Pages/Shopping-view/Checkout";
import { User_Account } from "../Pages/Shopping-view/User_Account";
import { ShopHome } from "../Pages/Shopping-view/ShopHome"
import { CheckAuth } from "../components/Common/CheckAuth";
import { UnAuth } from "../components/UnAuth-Page/UnAuth";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {

            }
        ]
    },
    {
        path: "/auth",
        element:
            (
                <CheckAuth >
                    <AuthLayout />
                </CheckAuth>

            ),
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
               
            }
          

        ]
    },
    {
        
        path:"/unauth",

        element:
        <CheckAuth>
        <UnAuth/>
        </CheckAuth>
    },
    {
        path: "/admin",
        element:
            (
                <CheckAuth >
                    <AdminLayout />
                </CheckAuth>
            ),
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "features",
                element: <Features />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "orders",
                element: <Orders />
            }
        ]
    },
    {
        path: "/shop",
        element:
            (

                <CheckAuth >
                    <Shoplayout />
                </CheckAuth>
            ),
        children: [
            {
                path: "home",
                element: <ShopHome />
            },
            {
                path: "listing",
                element: <Listing />
            },
            {
                path: "checkout",
                element: <Checkout />
            },
            {
                path: "account",
                element: <User_Account />
            }
        ]
    }

])
//root.render(<RouterProvider router={router} />)
export default router
