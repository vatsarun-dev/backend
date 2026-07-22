import { useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import toast from "react-hot-toast";
import { BadgeCheck, LockKeyhole, Mail, UserRound } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { useAuth } from "../../context/AuthContext";
import { getApiError } from "../../services/apiClient";
import { dashboardFor, normalizeRole } from "../../utils/auth";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be 2-50 characters")
    .max(50, "Name must be 2-50 characters")
    .refine((value) => !["admin", "root", "superuser"].includes(value.toLowerCase()), "This name is reserved"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .refine((value) => !value.includes("+"), "Plus aliases are not accepted"),
  designation: z.enum(["Teacher", "Principal"], {
    message: "Select designation",
  }),
  password: z
    .string()
    .min(6, "Password must contain 6-10 characters")
    .max(10, "Password must contain 6-10 characters")
    .regex(/\d/, "Must contain at least one digit")
    .regex(/[!@#$%]/, "Must contain ! @ # $ or %"),
  remember: z.boolean().optional(),
});

export function SignupPage() {
  const card = useRef(null);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      designation: "Teacher",
      password: "",
      remember: true,
    },
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

  async function onSubmit(values) {
    setLoading(true);
    try {
      const user = await signup(
        {
          name: values.name,
          email: values.email,
          designation: values.designation,
          password: values.password,
        },
        values.remember,
      );
      const role = normalizeRole(user);
      if (!role) {
        toast.error("Account created, but designation must be Teacher or Principal.");
        navigate("/login", { replace: true });
        return;
      }
      toast.success("Account created");
      navigate(dashboardFor(user), { replace: true });
    } catch (error) {
      toast.error(getApiError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card glass" ref={card}>
      <div className="auth-card-head" data-auth-reveal>
        <span className="eyebrow">Create Account</span>
        <h2>Register ERP staff access</h2>
        <p>Signup is connected to the backend admin schema and posts only supported fields.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="stack-form" data-auth-reveal>
        <FormField label="Name" error={errors.name?.message}>
          <div className="input-shell">
            <UserRound size={17} />
            <input type="text" {...register("name")} />
          </div>
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <div className="input-shell">
            <Mail size={17} />
            <input type="email" {...register("email")} />
          </div>
        </FormField>

        <FormField label="Designation" error={errors.designation?.message}>
          <div className="input-shell">
            <BadgeCheck size={17} />
            <select {...register("designation")}>
              <option value="Teacher">Teacher</option>
              <option value="Principal">Principal</option>
            </select>
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
            <input type="checkbox" {...register("remember")} />
            <span>Keep me signed in</span>
          </label>
          <Link to="/login">Already have an account?</Link>
        </div>

        <Button loading={loading} type="submit">Create account</Button>
      </form>
    </section>
  );
}
