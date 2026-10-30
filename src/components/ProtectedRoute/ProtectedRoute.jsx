import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div class="loader-container">
        <div class="spinner">
          <div class="spinner1"></div>
        </div>
      </div>
    );

  if (!user) return <Navigate to="/admin/login" />;

  return children;
};
