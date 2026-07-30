import { Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
