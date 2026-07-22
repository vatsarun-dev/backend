import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bell,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { SCHOOL } from "../constants/app";
import { normalizeRole } from "../utils/auth";

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = normalizeRole(user);
  const base = role === "Principal" ? "/principal" : "/teacher";
  const links = [
    { to: base, label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: `${base}/students`, label: "Students", icon: UsersRound },
    { to: `${base}/students/new`, label: "Add Student", icon: GraduationCap },
    { to: `${base}/search`, label: "Search", icon: Search },
    { to: `${base}/fees`, label: "Fees", icon: WalletCards },
    ...(role === "Principal" ? [{ to: `${base}/analytics`, label: "Analytics", icon: BarChart3 }] : []),
    { to: `${base}/profile`, label: "Profile", icon: UserRound },
    { to: `${base}/settings`, label: "Settings", icon: Settings },
  ];

  function handleLogout() {
    logout("Signed out");
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span><GraduationCap size={22} /></span>
          <div>
            <strong>{SCHOOL.shortName}</strong>
            <small>{role || "ERP"}</small>
          </div>
        </div>
        <nav>
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="sidebar-logout" type="button" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>
      <section className="workspace">
        <header className="topbar">
          <div>
            <strong>{SCHOOL.name}</strong>
            <span>{SCHOOL.location}</span>
          </div>
          <button className="icon-button" type="button" aria-label="Notifications">
            <Bell size={18} />
          </button>
        </header>
        <Outlet />
      </section>
    </div>
  );
}
