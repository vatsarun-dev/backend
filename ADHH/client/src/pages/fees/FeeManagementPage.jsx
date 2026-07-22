import { IndianRupee, ReceiptText, WalletCards } from "lucide-react";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";

export function FeeManagementPage() {
  return (
    <main className="page">
      <PageHeader eyebrow="Fee Management" title="Collections and dues" subtitle="The UI is prepared for payment history, receipt timelines, and fee summaries once backend fee routes exist." />
      <div className="stats-grid">
        <StatCard label="Total fees" value="--" meta="Needs fee API" icon={IndianRupee} tone="green" />
        <StatCard label="Paid fees" value="--" meta="Needs payment API" icon={WalletCards} tone="blue" />
        <StatCard label="Receipts" value="0" meta="No receipt route" icon={ReceiptText} tone="amber" />
      </div>
      <section className="panel">
        <EmptyState title="Fee endpoints were not found" message="No payment history, recent payments, receipt timeline, or fee collection routes are implemented in ADHH/server yet." />
      </section>
    </main>
  );
}
