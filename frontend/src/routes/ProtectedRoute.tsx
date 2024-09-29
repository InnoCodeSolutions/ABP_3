import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuthenticated, token } = useAuth();
    console.log("estaAutenticado", isAuthenticated, "Token", token);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;