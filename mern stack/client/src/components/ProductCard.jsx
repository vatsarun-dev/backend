import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useApp();

  return (
    <article className="card product-card">
      <div className="card-top">
        <span className="pill">{product.category}</span>
        <span className="stock">Stock: {product.stock}</span>
      </div>
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <button type="button" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </article>
  );
}

export function StatsPanel() {
  const { products, orders, users } = useApp();

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <span>Products</span>
        <strong>{products.length}</strong>
      </div>
      <div className="stat-card">
        <span>Orders</span>
        <strong>{orders.length}</strong>
      </div>
      <div className="stat-card">
        <span>Users</span>
        <strong>{users.length}</strong>
      </div>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Frontend demo app</p>
        <h1>Complex UI ready for manual backend connection</h1>
        <p>
          This app uses dummy data only. Wire axios calls in context and pages
          when you test your connection tool.
        </p>
        <Link to="/products" className="hero-btn">
          Browse Products
        </Link>
      </div>
    </section>
  );
}
