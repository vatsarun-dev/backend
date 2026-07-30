import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(form);
    if (ok) navigate("/");
  }

  return (
    <div className="page narrow">
      <section className="panel auth-panel">
        <h2>Login</h2>
        <p className="hint">Dummy login: any email from Users page + password 6+ chars</p>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="alice@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="password123"
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>

        <p className="connect-note">
          CONNECT HERE: call <code>POST /api/auth/login</code>
        </p>
      </section>
    </div>
  );
}
