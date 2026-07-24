import { Outlet } from "react-router-dom";
import { BookOpenCheck, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SCHOOL } from "../constants/app";

export function AuthLayout() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".auth-brand > *, .auth-proof-grid > div", {
        autoAlpha: 0,
        y: 18,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.05,
      });
      gsap.from(".auth-panel", {
        autoAlpha: 0,
        y: 18,
        duration: 0.58,
        ease: "power3.out",
        delay: 0.12,
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <main className="auth-page" ref={scope}>
      <section className="auth-brand">
        <div className="brand-mark">
          <GraduationCap size={28} />
        </div>
        <span className="eyebrow auth-kicker">{SCHOOL.affiliation}</span>
        <h1>{SCHOOL.name}</h1>
        <p>Admissions, student records, class intelligence, and staff workflows in one polished command center.</p>
        <div className="auth-proof-grid">
          <div><BookOpenCheck size={18} /><strong>Student-first records</strong><small>Search and register without friction.</small></div>
          <div><ShieldCheck size={18} /><strong>Role protected</strong><small>Teacher and principal workspaces stay focused.</small></div>
          <div><Sparkles size={18} /><strong>Operational clarity</strong><small>Live metrics keep the school moving.</small></div>
        </div>
      </section>
      <section className="auth-panel">
        <Outlet />
      </section>
    </main>
  );
}
