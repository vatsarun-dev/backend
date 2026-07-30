import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const ok = register(form);
    if (ok) navigate("/");
  }

  return (
    <div className="page narrow">
      <section className="panel auth-panel">
        <h2>Register</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>
          <button type="submit">Create Account</button>
        </form>

        <p className="connect-note">
          CONNECT HERE: call <code>POST /api/auth/register</code>
        </p>
      </section>
    </div>
  );
}
