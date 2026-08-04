import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success("Logged out");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ShopApp</Link>
      </div>

      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login">User Login</Link>
            <Link to="/register">User Register</Link>
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/admin/register">Admin Register</Link>
          </>
        )}

        {user && role === "user" && (
          <>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <span className="navbar-user">Hi, {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {user && role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <span className="navbar-user">Admin: {user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
