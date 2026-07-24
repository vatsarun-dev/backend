import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { AlertCircle, KeyRound, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { authService } from "../../services/authService";
import { getApiError } from "../../services/apiClient";

const schema = z.object({
  password: z
    .string()
    .min(6, "Password must contain 6-10 characters")
    .max(10, "Password must contain 6-10 characters")
    .regex(/\d/, "Add a digit")
    .regex(/[!@#$%]/, "Add ! @ # $ or %"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [userId, setUserId] = useState("");
  const [tokenError, setTokenError] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const passwordValue = watch("password") || "";
  const strength = Math.min(
    100,
    passwordValue.length * 12 + (/\d/.test(passwordValue) ? 20 : 0) + (/[!@#$%]/.test(passwordValue) ? 20 : 0),
  );

  useEffect(() => {
    let alive = true;
    async function validateToken() {
      setChecking(true);
      setTokenError("");
      try {
        const { data } = await authService.validateResetToken(token);
        if (alive) setUserId(data.userId);
      } catch (error) {
        if (alive) setTokenError(getApiError(error));
      } finally {
        if (alive) setChecking(false);
      }
    }
    validateToken();
    return () => {
      alive = false;
    };
  }, [token]);

  async function onSubmit(values) {
    if (!userId) {
      toast.error("Reset link is invalid or expired.");
      return;
    }
    setLoading(true);
    try {
      await authService.updatePassword(userId, { password: values.password });
      toast.success("Password updated");
      navigate("/password-updated", { replace: true });
    } catch (error) {
      toast.error(getApiError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card glass">
      <div className="auth-card-head">
        <span className="eyebrow">Reset Password</span>
        <h2>Create a new password</h2>
      </div>
      {checking ? (
        <div className="screen-loader inline-loader"><Loader2 className="spin" /> Checking reset link...</div>
      ) : tokenError ? (
        <div className="token-error">
          <AlertCircle size={22} />
          <strong>Reset link expired or invalid</strong>
          <p>{tokenError}</p>
          <Link className="quiet-link" to="/forgot-password">Request a new link</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="stack-form">
          <FormField label="New password" error={errors.password?.message}>
            <div className="input-shell"><KeyRound size={17} /><input type="password" autoComplete="new-password" {...register("password")} /></div>
          </FormField>
          <div className="strength" aria-label={`Password strength ${strength}%`}><span style={{ width: `${strength}%` }} /></div>
          <FormField label="Confirm password" error={errors.confirmPassword?.message}>
            <div className="input-shell"><KeyRound size={17} /><input type="password" autoComplete="new-password" {...register("confirmPassword")} /></div>
          </FormField>
          <Button disabled={!userId} loading={loading} type="submit">Update password</Button>
        </form>
      )}
      <Link className="quiet-link" to="/login">Back to login</Link>
    </section>
  );
}
