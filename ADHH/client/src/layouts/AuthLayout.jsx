import { Outlet } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { SCHOOL } from "../constants/app";

export function AuthLayout() {
  return (
    <main className="auth-page">
      <section className="auth-brand">
        <div className="brand-mark">
          <GraduationCap size={28} />
        </div>
        <p>{SCHOOL.affiliation}</p>
        <h1>{SCHOOL.name}</h1>
        <span>{SCHOOL.location} ERP Command Center</span>
      </section>
      <Outlet />
    </main>
  );
}
