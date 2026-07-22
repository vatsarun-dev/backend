import { BarChart3 } from "lucide-react";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";

export function AnalyticsPage() {
  return (
    <main className="page">
      <PageHeader eyebrow="Analytics" title="Revenue and admission intelligence" subtitle="Charts will connect to principal analytics routes once the backend exposes them." />
      <section className="panel">
        <EmptyState title="No analytics endpoint found" message="The current backend exposes auth and student registration only." icon={BarChart3} />
      </section>
    </main>
  );
}
