import { Link, Outlet } from "react-router-dom";
import { BookOpenCheck, GraduationCap, Menu, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SCHOOL } from "../constants/app";
import { SchoolStorySections } from "../components/ui/SchoolStorySections";

export function AuthLayout() {
  const scope = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".site-header, .auth-hero-copy > *, .auth-panel", {
        autoAlpha: 0,
        y: 20,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.06,
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <main className="auth-site" ref={scope}>
      <header className="site-header">
        <Link
          to="/login"
          className="site-logo"
          onClick={() => setMenuOpen(false)}
        >
          <span>
            <GraduationCap size={22} />
          </span>
          <strong>{SCHOOL.name}</strong>
        </Link>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
          <div className="nav-group">
            <button type="button">Student Experience</button>
            <div className="nav-menu">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Approach
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Admissions
              </Link>
              <Link to="/forgot-password" onClick={() => setMenuOpen(false)}>
                Family support
              </Link>
            </div>
          </div>
          <div className="nav-group">
            <button type="button">About</button>
            <div className="nav-menu">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Company
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Newsroom
              </Link>
            </div>
          </div>
        </nav>
        <div className="site-actions">
          <Link className="text-link" to="/login">
            Sign in
          </Link>
          <Link className="pill-button dark" to="/signup">
            Get started
          </Link>
        </div>
      </header>
      <section className="auth-page">
        <div className="auth-brand">
          <div className="auth-hero-copy">
            <span className="eyebrow">{SCHOOL.affiliation}</span>
            <h1>{SCHOOL.name}</h1>
            <p>
              A focused operating system for student records, admissions, and
              role-aware academic workflows.
            </p>
            <div className="hero-links">
              <Link to="/signup">Create staff access</Link>
              <Link to="/forgot-password">Recover password</Link>
            </div>
          </div>
        </div>
        <section className="auth-panel">
          <Outlet />
        </section>
      </section>
      <section className="public-story-wrap">
        <SchoolStorySections ctaTo="/signup" />
      </section>
      <footer className="site-footer">
        <div className="footer-brand">
          <span className="site-logo-mark">
            <GraduationCap size={22} />
          </span>
          <div>
            <strong>{SCHOOL.name}</strong>
            <p>{SCHOOL.location}</p>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <strong>Student Experience</strong>
            <Link to="/login">Approach</Link>
            <Link to="/signup">Admissions</Link>
            <Link to="/forgot-password">Support</Link>
          </div>
          <div>
            <strong>School Office</strong>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Get started</Link>
          </div>
          <div>
            <strong>Contact</strong>
            <span>Admissions desk</span>
            <span>786-791-GROW</span>
            <span>{SCHOOL.location}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>(c) 2026 {SCHOOL.shortName}. All rights reserved.</span>
          <span>
            <BookOpenCheck size={16} /> A warm, teacher-led school workspace.
          </span>
        </div>
      </footer>
    </main>
  );
}
