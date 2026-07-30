import { useApp } from "../context/AppContext.jsx";

export default function OrdersPage() {
  const { orders, user } = useApp();

  const visibleOrders =
    user?.role === "admin"
      ? orders
      : orders.filter((order) => order.userId === user?.id);

  return (
    <div className="page">
      <section className="panel">
        <h2>Orders</h2>

        {!user ? (
          <p className="hint">Login to see your orders (dummy data)</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.items.length}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`status ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p className="connect-note">
          CONNECT HERE: call <code>GET /api/orders</code> and{" "}
          <code>POST /api/orders</code>
        </p>
      </section>
    </div>
  );
}
