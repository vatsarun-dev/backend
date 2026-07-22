import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dashboardFor, hasRole } from "../utils/auth";

export function PublicRoute() {
  const { user, booting } = useAuth();
  if (booting) return <div className="screen-loader">Loading session...</div>;
  return user ? <Navigate to={dashboardFor(user)} replace /> : <Outlet />;
}

export function ProtectedRoute({ roles = [] }) {
  const { user, booting } = useAuth();
  const location = useLocation();
  if (booting) return <div className="screen-loader">Loading session...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!hasRole(user, roles)) return <Navigate to="/403" replace />;
  return <Outlet />;
}
