import { Activity, ArrowRight, CalendarDays, GraduationCap, Search, UserPlus, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { useAuth } from "../../context/AuthContext";
import { useGsapReveal } from "../../hooks/useGsapReveal";
import { getApiError } from "../../services/apiClient";
import { studentService } from "../../services/studentService";

export function TeacherDashboard() {
  const scope = useGsapReveal();
  const { user } = useAuth();
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

  const topClass = useMemo(() => {
    const entries = Object.entries(dashboard?.studentsPerClass || {});
    return entries.sort((a, b) => b[1] - a[1])[0];
  }, [dashboard]);

  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Teacher workspace"
        title={`Good to see you, ${user?.name || "Teacher"}`}
        subtitle="Register students, search records, and keep daily academic work moving from one focused desk."
        meta={<><span>Live operations</span><span>Teacher workspace</span></>}
        action={<Link to="students/new"><Button icon={UserPlus}>Add student</Button></Link>}
      />
      <div className="stats-grid">
        <StatCard label="Total students" value={dashboard?.totalStudents ?? "--"} meta="Shared database" icon={UsersRound} tone="green" trend="+ live" />
        <StatCard label="Today's registrations" value={dashboard?.todaysRegistrations ?? "--"} meta="Created since midnight" icon={Activity} tone="blue" trend="today" />
        <StatCard label="Most active class" value={topClass?.[0] || "--"} meta={topClass ? `${topClass[1]} students` : "Waiting for records"} icon={GraduationCap} tone="amber" trend="focus" />
        <StatCard label="Search" value="Live" meta="Name, ID, mobile, class" icon={Search} tone="rose" trend="ready" />
      </div>
      <div className="dashboard-grid">
        <section className="panel hero-widget" data-reveal>
          <div>
            <span className="eyebrow">Today's rhythm</span>
            <h2>Move from registration to lookup without losing context.</h2>
            <p>Start the workflows teachers use most often: add a student, search the register, or review the current class list.</p>
          </div>
          <div className="quick-actions">
            <Link to="students/new"><Button icon={UserPlus}>Register</Button></Link>
            <Link to="search"><Button variant="secondary" icon={Search}>Search</Button></Link>
            <Link to="students"><Button variant="ghost" icon={ArrowRight}>View records</Button></Link>
          </div>
        </section>
        <section className="panel timeline-widget" data-reveal>
          <h3>Activity timeline</h3>
          <div><CalendarDays size={16} /><span>Dashboard synced with backend student metrics.</span></div>
          <div><UserPlus size={16} /><span>{dashboard?.todaysRegistrations ?? 0} registrations recorded today.</span></div>
          <div><GraduationCap size={16} /><span>{topClass ? `${topClass[0]} leads current class strength.` : "Class trends appear after records are added."}</span></div>
        </section>
      </div>
      <section className="panel" data-reveal>
        {error ? (
          <EmptyState title="Dashboard could not load" message={error} />
        ) : dashboard?.recentStudents?.length ? (
          <div className="recent-list">
            <div className="section-heading"><span className="eyebrow">Recent</span><h3>Latest student additions</h3></div>
            {dashboard.recentStudents.map((student) => (
              <Link to="students" key={student._id || student.studentId}>
                <span className="avatar">{student.name?.slice(0, 1)}</span>
                <div><strong>{student.name}</strong><small>Class {student.class} / {student.studentId}</small></div>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="No students yet" message="Add a student to populate this dashboard." action={<Link to="students/new"><Button icon={UserPlus}>Add first student</Button></Link>} />
        )}
      </section>
    </main>
  );
}
