import { NavLink, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Layout() {
  const { user, cart, logout } = useApp();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="brand">ShopHub</div>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/cart">Cart ({cart.length})</NavLink>
        </div>
        <div className="nav-auth">
          {user ? (
            <>
              <span className="user-badge">{user.name}</span>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </nav>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
