import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { dashboardFor, normalizeRole } from "../../utils/auth";

export function GoogleCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  useEffect(() => {
    const encoded = params.get("user");
    if (!encoded) return;
    try {
      const user = JSON.parse(decodeURIComponent(encoded));
      const role = normalizeRole(user);
      if (!role) {
        toast.error("Google account needs a Teacher or Principal designation.");
        navigate("/login", { replace: true });
        return;
      }
      authenticate(user, true);
      toast.success("Google sign-in complete");
      navigate(dashboardFor(user), { replace: true });
    } catch {
      toast.error("Google sign-in response could not be read.");
      navigate("/login", { replace: true });
    }
  }, [authenticate, navigate, params]);

  return (
    <section className="auth-card">
      <div className="auth-card-head">
        <span className="eyebrow">Google Authentication</span>
        <h2>Finishing sign-in</h2>
        <p>Completing your secure Google authentication handoff.</p>
      </div>
      <div className="screen-loader inline-loader"><Loader2 className="spin" /> Checking Google session...</div>
      <Link className="quiet-link" to="/login">Return to login</Link>
    </section>
  );
}
