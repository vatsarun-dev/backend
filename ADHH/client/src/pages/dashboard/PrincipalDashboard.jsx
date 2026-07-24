import { BarChart3, Building2, GraduationCap, PieChart, TrendingUp, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { SchoolStorySections } from "../../components/ui/SchoolStorySections";
import { StatCard } from "../../components/ui/StatCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { studentService } from "../../services/studentService";
import { getApiError } from "../../services/apiClient";

export function PrincipalDashboard() {
  const scope = useGsapReveal();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    studentService.dashboard()
      .then(({ data }) => {
        if (alive) setDashboard(data.dashboard);
      })
      .catch((err) => {
        if (alive) setError(getApiError(err));
      });
    return () => {
      alive = false;
    };
  }, []);

  const classCount = useMemo(
    () => Object.keys(dashboard?.studentsPerClass || {}).length,
    [dashboard],
  );

  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Principal console"
        title="Institution overview"
        subtitle="Track class strength, admission velocity, and operational coverage from live student records."
        meta={<><span>Executive workspace</span><span>{classCount || 0} active classes</span></>}
      />
      <div className="stats-grid">
        <StatCard label="Total students" value={dashboard?.totalStudents ?? "--"} meta="Shared student records" icon={UsersRound} tone="green" trend="portfolio" />
        <StatCard label="Classes active" value={classCount || "--"} meta="Classes with students" icon={GraduationCap} tone="blue" trend="coverage" />
        <StatCard label="Today's registrations" value={dashboard?.todaysRegistrations ?? "--"} meta="New records today" icon={TrendingUp} tone="amber" trend="daily" />
        <StatCard label="Analytics" value="Live" meta="Student distribution" icon={BarChart3} tone="rose" trend="synced" />
      </div>
      <div className="dashboard-grid principal-grid">
        <section className="panel hero-widget" data-reveal>
          <div>
            <span className="eyebrow">Academic intelligence</span>
            <h2>Read the school register like an operating dashboard.</h2>
            <p>Fast signals for staffing, admission planning, and classroom capacity decisions.</p>
          </div>
          <div className="radial-meter" style={{ "--meter": `${Math.min(100, classCount * 12)}%` }}>
            <PieChart size={26} />
            <strong>{classCount || 0}</strong>
            <span>classes</span>
          </div>
        </section>
        <section className="panel timeline-widget" data-reveal>
          <h3>Leadership signals</h3>
          <div><Building2 size={16} /><span>{dashboard?.totalStudents ?? 0} total student records in the school register.</span></div>
          <div><TrendingUp size={16} /><span>{dashboard?.todaysRegistrations ?? 0} new registrations today.</span></div>
          <div><BarChart3 size={16} /><span>Distribution updates as new students are saved.</span></div>
        </section>
      </div>
      <section className="panel" data-reveal>
        {error ? (
          <EmptyState title="Analytics could not load" message={error} />
        ) : dashboard?.studentsPerClass ? (
          <div className="class-distribution">
            <div className="section-heading"><span className="eyebrow">Distribution</span><h3>Students by class</h3></div>
            {Object.entries(dashboard.studentsPerClass).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <i style={{ width: `${Math.max(8, (value / Math.max(1, dashboard.totalStudents)) * 100)}%` }} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No analytics yet" message="Student metrics will appear after registrations are created." />
        )}
      </section>
      <SchoolStorySections basePath="/principal" />
    </main>
  );
}
