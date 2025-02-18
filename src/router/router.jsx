import Root from "../Layout/Root";
import AllScholarShip from "../components/AllScholkarShip/AllScholarShip";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginPage from "../components/LoginPage/LoginPage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import Dashboard from "../Layout/DashBoard";
import MyProfile from "../components/DashBoard/MyProfile";
import MyApplication from "../components/DashBoard/MyApplication";
import MyReviews from "../components/DashBoard/MyReviews";
import ManageUsers from "../components/DashBoard/ManageUsers";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../components/DashBoard/AdminProfile";
import AddScholarship from "../components/DashBoard/AddScholarShip";
import ManageScholarship from "../components/DashBoard/ManageScholarship";
import ScholarshipDetails from "../components/ScholarshipDetails/ScholarshipDetails";
import Payment from "../components/Payment/Payment";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import ManageReviews from "../components/DashBoard/ManageReviews";
import ManageAppliedScholarship from "../components/DashBoard/ManageAppliedScholarship";
import DashBoardHome from "../components/DashBoard/DashBoardHome";
import AnalyticChart from "../components/DashBoard/AnalyticChart";
import Contact from "../components/ContactUs/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allScholarship",
        element: <AllScholarShip></AllScholarShip>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/scholarshipDetails/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "myApplication",
        element: <MyApplication></MyApplication>,
      },
      {
        path: "myReviews",
        element: <MyReviews></MyReviews>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "adminProfile",
        element: <AdminProfile></AdminProfile>,
      },
      {
        path: "addScholarship",
        element: <AddScholarship></AddScholarship>,
      },
      {
        path: "manageScholarships",
        element: <ManageScholarship></ManageScholarship>,
      },
      {
        path: "manageReviews",
        element: <ManageReviews></ManageReviews>,
      },
      {
        path: "manageApplications",
        element: <ManageAppliedScholarship></ManageAppliedScholarship>,
      },
      {
        path: "dashBoardHome",
        element: <DashBoardHome></DashBoardHome>,
      },
      {
        path: "analytics",
        element: <AnalyticChart></AnalyticChart>,
      },
    ],
  },
]);
export default router;
