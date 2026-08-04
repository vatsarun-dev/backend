import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// allowedRole: "user" | "admin"
export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to={allowedRole === "admin" ? "/admin/login" : "/login"} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
