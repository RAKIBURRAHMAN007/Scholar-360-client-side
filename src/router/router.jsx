import Root from "../Layout/Root";
import AllScholarShip from "../components/AllScholkarShip/AllScholarShip";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginPage from "../components/LoginPage/LoginPage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import Dashboard from "../Layout/DashBoard";
import MyProfile from "../components/DashBoard/MyProfile";
import MyApplication from "../components/DashBoard/MyApplication";
import MyReviews from "../components/DashBoard/MyReviews";
import ManageUsers from "../components/DashBoard/ManageUsers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allScholarship',
                element: <AllScholarShip></AllScholarShip>
            },
            {
                path: '/login',
                element: <LoginPage></LoginPage>
            },
            {
                path: '/register',
                element: <RegisterPage></RegisterPage>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [

            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'myApplication',
                element: <MyApplication></MyApplication>
            },
            {
                path: 'myReviews',
                element: <MyReviews></MyReviews>
            },
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            }
        ]
    }
]);
export default router;