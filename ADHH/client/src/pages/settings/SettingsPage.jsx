import { Cookie, KeyRound, Palette, ShieldCheck, Sparkles, Sun } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { useTheme } from "../../context/ThemeContext";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export function SettingsPage() {
  const scope = useGsapReveal();
  const { setTheme } = useTheme();

  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Settings"
        title="Workspace preferences"
        subtitle="Review local presentation preferences and the active workspace safeguards."
        meta={<><span>Local preferences</span><span>Protected access</span></>}
      />
      <section className="panel settings-list">
        <div>
          <Palette size={20} />
          <span><strong>Warm schoolhouse theme</strong><small>The interface stays in the cream editorial system across the workspace.</small></span>
          <div className="theme-toggle" role="group" aria-label="Theme">
            <button className="active" type="button" onClick={() => setTheme("light")}><Sun size={16} /> Cream</button>
            <button type="button" onClick={() => setTheme("light")}><Sparkles size={16} /> Editorial</button>
          </div>
        </div>
        <div><ShieldCheck size={20} /><span><strong>Protected routes</strong><small>Unauthenticated users return to login.</small></span><strong>Enabled</strong></div>
        <div><KeyRound size={20} /><span><strong>Role guards</strong><small>Routes are scoped by staff designation.</small></span><strong>Teacher / Principal</strong></div>
        <div><Cookie size={20} /><span><strong>Axios credentials</strong><small>Cookie-based backend auth is enabled.</small></span><strong>Enabled</strong></div>
      </section>
    </main>
  );
}
