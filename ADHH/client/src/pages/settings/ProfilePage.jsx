import { Mail, UserRound } from "lucide-react";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { normalizeRole } from "../../utils/auth";

export function ProfilePage() {
  const { user } = useAuth();
  return (
    <main className="page">
      <PageHeader eyebrow="Profile" title="Account details" subtitle="Profile data is rendered from the authenticated backend login response." />
      <section className="profile-card panel">
        <div className="avatar"><UserRound size={34} /></div>
        <div>
          <h2>{user?.name}</h2>
          <p><Mail size={15} /> {user?.email}</p>
          <span className="chip paid">{normalizeRole(user)}</span>
        </div>
      </section>
    </main>
  );
}
