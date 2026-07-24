import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bell,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { SCHOOL } from "../constants/app";
import { normalizeRole } from "../utils/auth";

export function DashboardLayout() {
  const shell = useRef(null);
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const role = normalizeRole(user);
  const base = role === "Principal" ? "/principal" : "/teacher";
  const links = [
    { to: base, label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: `${base}/students`, label: "Students", icon: UsersRound },
    { to: `${base}/students/new`, label: "Add Student", icon: GraduationCap },
    { to: `${base}/search`, label: "Search", icon: Search },
    ...(role === "Principal" ? [{ to: `${base}/analytics`, label: "Analytics", icon: BarChart3 }] : []),
    { to: `${base}/profile`, label: "Profile", icon: UserRound },
    { to: `${base}/settings`, label: "Settings", icon: Settings },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sidebar-brand, .sidebar nav a, .sidebar-logout", {
        autoAlpha: 0,
        x: -18,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.035,
      });
      gsap.from(".topbar > *", {
        autoAlpha: 0,
        y: -10,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.05,
      });
    }, shell);
    return () => ctx.revert();
  }, []);

  function handleLogout() {
    logout("Signed out");
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell" ref={shell}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span><GraduationCap size={22} /></span>
          <div>
            <strong>{SCHOOL.shortName}</strong>
            <small>{role || "ERP"} command suite</small>
          </div>
        </div>
        <div className="sidebar-card">
          <Sparkles size={18} />
          <strong>Academic operations</strong>
          <small>Live admissions, search, and class intelligence.</small>
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
            <span>{SCHOOL.location} · {role || "Workspace"}</span>
          </div>
          <div className="topbar-search" aria-hidden="true">
            <Search size={16} />
            <span>Search students, classes, IDs</span>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-button" type="button" aria-label="Notifications">
            <Bell size={18} />
          </button>
        </header>
        <Outlet />
      </section>
    </div>
  );
}
