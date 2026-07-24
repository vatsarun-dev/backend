import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/Button";

export function PasswordUpdatedPage() {
  return (
    <section className="auth-card success-card">
      <CheckCircle2 size={42} />
      <div className="auth-card-head">
        <span className="eyebrow">Password Updated</span>
        <h2>Your account is ready</h2>
        <p>You can now sign in with the new password.</p>
      </div>
      <Link to="/login"><Button>Back to login</Button></Link>
    </section>
  );
}
