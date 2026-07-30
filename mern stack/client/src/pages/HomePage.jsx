import { HeroBanner, StatsPanel } from "../components/ProductCard.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function HomePage() {
  const { orders, user } = useApp();

  return (
    <div className="page">
      <HeroBanner />
      <StatsPanel />

      <section className="panel">
        <h2>Recent Orders (dummy)</h2>
        {orders.slice(0, 3).map((order) => (
          <div key={order.id} className="list-row">
            <span>{order.id}</span>
            <span>${order.total.toFixed(2)}</span>
            <span className={`status ${order.status}`}>{order.status}</span>
          </div>
        ))}
      </section>

      {!user && (
        <section className="panel warning">
          You are not logged in. Login page works with dummy data only until you
          connect the backend.
        </section>
      )}
    </div>
  );
}
