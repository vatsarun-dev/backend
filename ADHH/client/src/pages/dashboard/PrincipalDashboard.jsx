import { BarChart3, IndianRupee, TrendingUp, UsersRound } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export function PrincipalDashboard() {
  const scope = useGsapReveal();
  return (
    <main className="page" ref={scope}>
      <PageHeader eyebrow="Principal Console" title="Institution overview" subtitle="Executive metrics are ready for the fee and student list APIs when those backend modules are added." />
      <div className="stats-grid">
        <StatCard label="Total students" value="0" meta="Needs list endpoint" icon={UsersRound} tone="green" />
        <StatCard label="Collected fees" value="--" meta="Needs payment endpoint" icon={IndianRupee} tone="blue" />
        <StatCard label="Pending fees" value="--" meta="Derived from fee API" icon={TrendingUp} tone="amber" />
        <StatCard label="Analytics" value="Ready" meta="Backend expansion prepared" icon={BarChart3} tone="rose" />
      </div>
      <section className="panel" data-reveal>
        <EmptyState title="Analytics awaits backend data" message="No teacher management, student list, payment, or analytics endpoints were present in ADHH/server." />
      </section>
    </main>
  );
}
