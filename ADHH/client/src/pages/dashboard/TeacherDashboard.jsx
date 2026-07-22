import { Activity, Search, UsersRound, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export function TeacherDashboard() {
  const scope = useGsapReveal();
  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Teacher Workspace"
        title="Student operations"
        subtitle="Register students, review fee state, and search records through backend-backed workflows."
        action={<Link to="students/new"><Button icon={UsersRound}>Add student</Button></Link>}
      />
      <div className="stats-grid">
        <StatCard label="Students loaded" value="0" meta="List API not implemented" icon={UsersRound} tone="green" />
        <StatCard label="Fee collection" value="--" meta="Awaiting fee API" icon={WalletCards} tone="amber" />
        <StatCard label="Search status" value="Local" meta="No search route found" icon={Search} tone="rose" />
        <StatCard label="Recent activity" value="Live" meta="New submissions appear in session" icon={Activity} tone="blue" />
      </div>
      <section className="panel" data-reveal>
        <EmptyState title="No student list endpoint in backend" message="The frontend is wired to the available registration API and will display returned records created during this session." />
      </section>
    </main>
  );
}
