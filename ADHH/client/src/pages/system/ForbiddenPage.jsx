import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { Button } from "../../components/ui/Button";

export function ForbiddenPage() {
  return (
    <main className="system-page">
      <div className="system-card">
      <ShieldAlert size={34} />
      <h1>403</h1>
      <span className="eyebrow">Access restricted</span>
      <p>This account is not authorized for that workspace.</p>
      <Link to="/login"><Button>Return to login</Button></Link>
      </div>
    </main>
  );
}
