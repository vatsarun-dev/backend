import { BarChart3 } from "lucide-react";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export function AnalyticsPage() {
  const scope = useGsapReveal();
  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Analytics"
        title="Admission intelligence"
        subtitle="Student growth and class distribution live in the principal dashboard."
        meta={<><span>Principal module</span><span>Live metrics</span></>}
      />
      <section className="panel">
        <EmptyState title="Focused analytics ready" message="Use the principal dashboard for live class distribution and recent student additions." icon={BarChart3} />
      </section>
    </main>
  );
}
