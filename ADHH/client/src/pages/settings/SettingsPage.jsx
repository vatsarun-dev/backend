import { ShieldCheck } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";

export function SettingsPage() {
  return (
    <main className="page">
      <PageHeader eyebrow="Settings" title="Security preferences" subtitle="Frontend session expiry mirrors the backend cookie lifetime of 15 minutes." />
      <section className="panel settings-list">
        <div><ShieldCheck size={20} /><span>Protected routes</span><strong>Enabled</strong></div>
        <div><ShieldCheck size={20} /><span>Role guards</span><strong>Teacher / Principal</strong></div>
        <div><ShieldCheck size={20} /><span>Axios credentials</span><strong>Enabled</strong></div>
      </section>
    </main>
  );
}
