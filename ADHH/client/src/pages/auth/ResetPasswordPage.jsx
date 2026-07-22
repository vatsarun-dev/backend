import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { KeyRound } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { authService } from "../../services/authService";
import { getApiError } from "../../services/apiClient";

const schema = z.object({
  password: z.string().min(6).max(10).regex(/\d/, "Add a digit").regex(/[!@#$%]/, "Add ! @ # $ or %"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export function ResetPasswordPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  const passwordValue = watch("password") || "";
  const strength = Math.min(
    100,
    passwordValue.length * 12 + (/\d/.test(passwordValue) ? 20 : 0) + (/[!@#$%]/.test(passwordValue) ? 20 : 0),
  );

  async function onSubmit(values) {
    setLoading(true);
    try {
      await authService.updatePassword(id, { password: values.password });
      toast.success("Password updated");
      navigate("/login", { replace: true });
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
      <form onSubmit={handleSubmit(onSubmit)} className="stack-form">
        <FormField label="New password" error={errors.password?.message}>
          <div className="input-shell"><KeyRound size={17} /><input type="password" {...register("password")} /></div>
        </FormField>
        <div className="strength"><span style={{ width: `${strength}%` }} /></div>
        <FormField label="Confirm password" error={errors.confirmPassword?.message}>
          <div className="input-shell"><KeyRound size={17} /><input type="password" {...register("confirmPassword")} /></div>
        </FormField>
        <Button loading={loading} type="submit">Update password</Button>
      </form>
      <Link className="quiet-link" to="/login">Back to login</Link>
    </section>
  );
}
