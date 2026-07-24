import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpenCheck,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UserPlus,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAuth } from "../context/AuthContext";
import { SCHOOL } from "../constants/app";
import { normalizeRole } from "../utils/auth";

export function DashboardLayout() {
  const shell = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = normalizeRole(user);
  const base = role === "Principal" ? "/principal" : "/teacher";
  const groups = [
    {
      label: "Student Experience",
      links: [
        { to: base, label: "Overview", icon: LayoutDashboard, end: true },
        { to: `${base}/students`, label: "Student records", icon: UsersRound },
        { to: `${base}/students/new`, label: "Register student", icon: UserPlus },
        { to: `${base}/search`, label: "Search", icon: Search },
      ],
    },
    {
      label: "School Office",
      links: [
        ...(role === "Principal" ? [{ to: `${base}/analytics`, label: "Analytics", icon: BarChart3 }] : []),
        { to: `${base}/profile`, label: "Profile", icon: UserRound },
        { to: `${base}/settings`, label: "Settings", icon: Settings },
      ],
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".site-header", {
        autoAlpha: 0,
        y: -12,
        duration: 0.45,
        ease: "power3.out",
      });
    }, shell);
    return () => ctx.revert();
  }, []);

  function handleLogout() {
    logout("Signed out");
    navigate("/login", { replace: true });
  }

  return (
    <div className="site-shell" ref={shell}>
      <header className="site-header">
        <NavLink to={base} className="site-logo" onClick={() => setMenuOpen(false)}>
          <span><GraduationCap size={22} /></span>
          <strong>{SCHOOL.shortName}</strong>
        </NavLink>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
          {groups.map((group) => (
            <div className="nav-group" key={group.label}>
              <button type="button">{group.label}</button>
              <div className="nav-menu">
                {group.links.map((item) => (
                  <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMenuOpen(false)}>
                    <item.icon size={17} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="site-actions">
          <button className="text-link" type="button" onClick={handleLogout}>
            <LogOut size={16} />
            Sign out
          </button>
          <NavLink className="pill-button dark" to={`${base}/students/new`}>
            Get started
          </NavLink>
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="site-logo-mark"><GraduationCap size={22} /></span>
          <div>
            <strong>{SCHOOL.name}</strong>
            <p>{SCHOOL.location} / {role || "School workspace"}</p>
          </div>
        </div>
        <div className="footer-links">
          <div><strong>Student Experience</strong><NavLink to={`${base}/students`}>Records</NavLink><NavLink to={`${base}/search`}>Search</NavLink><NavLink to={`${base}/students/new`}>Admissions</NavLink></div>
          <div><strong>School Office</strong><NavLink to={base}>Dashboard</NavLink><NavLink to={`${base}/profile`}>Profile</NavLink><NavLink to={`${base}/settings`}>Settings</NavLink></div>
          <div><strong>Contact</strong><span>Admissions desk</span><span>786-791-GROW</span><span>{SCHOOL.location}</span></div>
        </div>
        <div className="footer-bottom">
          <span>(c) 2026 {SCHOOL.shortName}. All rights reserved.</span>
          <span><BookOpenCheck size={16} /> A warm, teacher-led school workspace.</span>
        </div>
      </footer>
    </div>
  );
}
