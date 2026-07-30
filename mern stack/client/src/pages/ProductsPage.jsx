import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { categories } from "../data/dummyData.js";
import { useApp } from "../context/AppContext.jsx";

export default function ProductsPage() {
  const { products } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        category === "all" || product.category === category;
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, search, category]);

  return (
    <div className="page">
      <section className="panel">
        <div className="panel-header">
          <h2>Products</h2>
          <p className="hint">Filtered locally with dummy data</p>
        </div>

        <div className="filters">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="connect-note">
          CONNECT HERE: call <code>GET /api/products?search=&category=</code>
        </p>
      </section>
    </div>
  );
}
