import React, { useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import toast from "react-hot-toast";
import { Chrome, LockKeyhole, Mail } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { getApiError } from "../../services/apiClient";
import { dashboardFor, normalizeRole } from "../../utils/auth";

const schema = z.object({
  email: z
    .string()
    .email("Enter a valid email")
    .refine((value) => !value.includes("+"), "Plus aliases are not accepted"),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .max(10, "Maximum 10 characters")
    .regex(/\d/, "Add a digit")
    .regex(/[!@#$%]/, "Add ! @ # $ or %"),
  remember: z.boolean().optional(),
});

export function LoginPage() {
  const card = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: true },
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(card.current, {
        autoAlpha: 1,
        y: 0,
        clearProps: "opacity,visibility",
      });
      gsap.from("[data-auth-reveal]", {
        autoAlpha: 0,
        y: 14,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.05,
        clearProps: "opacity,visibility,transform",
      });
    }, card);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (new URLSearchParams(location.search).get("error") === "google_auth_failed") {
      toast.error("Google sign-in failed. Check the deployed redirect URI and try again.");
      navigate("/login", { replace: true });
    }
  }, [location.search, navigate]);

  async function onSubmit(values) {
    setLoading(true);
    try {
      const user = await login(
        { email: values.email, password: values.password },
        values.remember,
      );
      const role = normalizeRole(user);
      if (!role) {
        toast.error("Your account needs a Teacher or Principal designation.");
        return;
      }
      toast.success("Welcome back");
      navigate(location.state?.from?.pathname || dashboardFor(user), {
        replace: true,
      });
    } catch (error) {
      toast.error(getApiError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card" ref={card}>
      <div className="auth-card-head" data-auth-reveal>
        <span className="eyebrow">Secure login</span>
        <h2>Sign in to Amardeep Hr. Sec School</h2>
        <p>
          Use your staff credentials to enter the workspace assigned to your
          role.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="stack-form"
        data-auth-reveal
      >
        <FormField label="Email" error={errors.email?.message}>
          <div className="input-shell">
            <Mail size={17} />
            <input type="email" {...register("email")} />
          </div>
        </FormField>
        <FormField label="Password" error={errors.password?.message}>
          <div className="input-shell">
            <LockKeyhole size={17} />
            <input type="password" {...register("password")} />
          </div>
        </FormField>
        <div className="form-row">
          <label className="check">
            <input type="checkbox" {...register("remember")} />{" "}
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <Button loading={loading} type="submit">
          Sign in
        </Button>
      </form>
      <button
        className="oauth-button"
        data-auth-reveal
        type="button"
        onClick={() => {
          window.location.href = authService.googleLoginUrl();
        }}
      >
        <Chrome size={18} />
        <span>Continue with Google</span>
      </button>
      <p className="auth-switch" data-auth-reveal>
        New staff member? <Link to="/signup">Create an account</Link>
      </p>
    </section>
  );
}
