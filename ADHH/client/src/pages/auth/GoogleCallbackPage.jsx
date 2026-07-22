import { Link } from "react-router-dom";

export function GoogleCallbackPage() {
  return (
    <section className="auth-card glass">
      <div className="auth-card-head">
        <span className="eyebrow">Google Authentication</span>
        <h2>Callback received</h2>
        <p>The current backend callback returns JSON directly. Configure it to redirect here with the authenticated user session for a complete browser OAuth handoff.</p>
      </div>
      <Link className="quiet-link" to="/login">Return to login</Link>
    </section>
  );
}
