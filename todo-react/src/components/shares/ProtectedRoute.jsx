import { useContext } from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, accessBy }) => {
    const { user } = useContext(AuthContext);

    if (accessBy === "non-authenticated") {
        if (!user) {
            return children;
        }
    } else if (accessBy === "authenticated") {
        if (user) {
            return children;
        }
    }

    return <Navigate to="/login"></Navigate>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
    accessBy: PropTypes.string,
}

export default ProtectedRoute;