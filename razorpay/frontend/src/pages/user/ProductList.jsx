import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserProducts, addToCart } from "../../services/api";
import Spinner from "../../components/Spinner";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await getUserProducts();
        setProducts(res.data.products || []);
      } catch (err) {
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  async function handleAddToCart(productId) {
    setAddingId(productId);
    try {
      await addToCart(productId);
      toast.success("Added to cart! View your cart to see it.");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add to cart.";
      toast.error(msg);
    } finally {
      setAddingId(null);
    }
  }

  if (loading) return <Spinner />;

  if (products.length === 0)
    return (
      <div className="empty-state">
        <p>No products available yet.</p>
      </div>
    );

  return (
    <div className="page-container">
      <h1 className="page-title">All Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-img"
              />
            ) : (
              <div className="product-img-placeholder">No Image</div>
            )}

            <div className="product-body">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-desc">{product.description}</p>

              <div className="product-meta">
                {product.brand && (
                  <span className="tag">{product.brand}</span>
                )}
                {product.category && (
                  <span className="tag">{product.category}</span>
                )}
              </div>

              <div className="product-pricing">
                <span className="product-price">₹{product.price}</span>
                {product.discountPrice && (
                  <span className="product-discount">
                    ₹{product.discountPrice}
                  </span>
                )}
              </div>

              <div className="product-stock">
                Stock:{" "}
                <strong className={product.stock === 0 ? "out-of-stock" : ""}>
                  {product.stock === 0 ? "Out of stock" : product.stock}
                </strong>
              </div>

              <button
                className="btn-primary"
                onClick={() => handleAddToCart(product._id)}
                disabled={addingId === product._id || product.stock === 0}
              >
                {addingId === product._id ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
