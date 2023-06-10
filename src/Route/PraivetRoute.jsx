import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import loader from '../assets/spinner.gif';
import { AuthContext } from "../providers/AuthProvider";

function PraivetRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center"> <img src={loader} alt="" /></div>
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace />
}


export default PraivetRoute;