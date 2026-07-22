import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { MailCheck } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { useAuth } from "../../context/AuthContext";

const schema = z.object({ email: z.string().email("Enter the registered email") });

export function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values) {
    setLoading(true);
    try {
      await forgotPassword(values);
      toast.success("Reset email sent");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card glass">
      <div className="auth-card-head">
        <span className="eyebrow">Password Recovery</span>
        <h2>Request a reset link</h2>
        <p>The backend sends the reset email to the registered address.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="stack-form">
        <FormField label="Email" error={errors.email?.message}>
          <div className="input-shell"><MailCheck size={17} /><input type="email" {...register("email")} /></div>
        </FormField>
        <Button loading={loading} type="submit">Send reset email</Button>
      </form>
      <Link className="quiet-link" to="/login">Back to login</Link>
    </section>
  );
}
