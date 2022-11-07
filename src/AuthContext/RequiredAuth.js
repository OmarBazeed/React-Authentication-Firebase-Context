import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "./authContext";

const RequiredAuth = (props) => {
    const { currentUser } = useContext(authContext);
    const location = useLocation();

    if (!currentUser) {

        return <Navigate to = '/login'
        state = {
            { path: location.pathname }
        }
        />
    }

    return props.children
}

export default RequiredAuth;