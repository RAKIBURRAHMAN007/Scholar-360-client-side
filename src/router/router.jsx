import Root from "../Layout/Root";
import AllScholarShip from "../components/AllScholkarShip/AllScholarShip";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home/Home";

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
            }
        ]
    },
]);
export default router;