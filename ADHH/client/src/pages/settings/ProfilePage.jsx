import { Mail, UserRound } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { normalizeRole } from "../../utils/auth";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export function ProfilePage() {
  const scope = useGsapReveal();
  const { user } = useAuth();
  return (
    <main className="page" ref={scope}>
      <PageHeader
        eyebrow="Profile"
        title="Account details"
        subtitle="Staff identity and role details from the authenticated backend session."
        meta={<><span>Signed-in staff</span><span>Role-aware workspace</span></>}
      />
      <section className="profile-card panel">
        <div className="avatar"><UserRound size={34} /></div>
        <div>
          <span className="eyebrow">Staff profile</span>
          <h2>{user?.name || "Staff member"}</h2>
          <p><Mail size={15} /> {user?.email}</p>
          <span className="chip paid">{normalizeRole(user)}</span>
        </div>
      </section>
    </main>
  );
}
