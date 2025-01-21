import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import UseAdmin from "../hooks/UseAdmin";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../sharedComponent/Loading/Loading";


const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();
   

    if (loading || isAdminLoading) {
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>

};

export default AdminRoute;