import { useApp } from "../context/AppContext.jsx";

export default function UsersPage() {
  const { users, user } = useApp();

  if (user?.role !== "admin") {
    return (
      <div className="page">
        <section className="panel warning">
          Admin only page. Login as Alice (admin) using dummy login.
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="panel">
        <h2>Users (Admin)</h2>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="connect-note">
          CONNECT HERE: call <code>GET /api/users</code> with Bearer token
        </p>
      </section>
    </div>
  );
}
