import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCart, removeFromCart, addToCart } from "../../services/api";
import Spinner from "../../components/Spinner";
import PaymentComponent from "../../components/Button.jsx";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [addingId, setAddingId] = useState(null);

  // Fetch cart from backend on mount — products are populated with full details
  async function fetchCart() {
    try {
      const res = await getCart();
      setCart(res.data.cart);
    } catch (err) {
      toast.error("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function handleRemove(productId) {
    setRemovingId(productId);
    try {
      const res = await removeFromCart(productId);
      // Backend returns updated cart — re-fetch to get fully populated data
      await fetchCart();
      toast.success("Item removed.");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to remove item.";
      toast.error(msg);
    } finally {
      setRemovingId(null);
    }
  }

  async function handleIncrease(productId) {
    setAddingId(productId);
    try {
      await addToCart(productId);
      await fetchCart();
      toast.success("Quantity updated.");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update quantity.";
      toast.error(msg);
    } finally {
      setAddingId(null);
    }
  }

  if (loading) return <Spinner />;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="page-container">
        <h1 className="page-title">Your Cart</h1>
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <a
            href="/products"
            className="btn-primary"
            style={{ display: "inline-block", marginTop: "1rem" }}
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map((item) => {
            const product = item.product;
            const productId = product?._id || product;

            return (
              <div key={productId} className="cart-item">
                <div className="cart-item-img">
                  {product?.images?.[0] ? (
                    <img src={product.images[0]} alt={product.title} />
                  ) : (
                    <div className="cart-img-placeholder" />
                  )}
                </div>

                <div className="cart-item-info">
                  <h3>{product?.title || "Product"}</h3>
                  <p className="cart-item-price">
                    ₹{product?.price ?? "—"} × {item.quantity}
                  </p>
                  {product?.brand && (
                    <span className="tag">{product.brand}</span>
                  )}
                </div>

                <div className="cart-item-actions">
                  <button
                    className="btn-icon"
                    onClick={() => handleRemove(productId)}
                    disabled={removingId === productId}
                    title="Decrease / Remove"
                  >
                    {removingId === productId ? "..." : "−"}
                  </button>

                  <span className="cart-qty">{item.quantity}</span>

                  <button
                    className="btn-icon"
                    onClick={() => handleIncrease(productId)}
                    disabled={addingId === productId}
                    title="Increase"
                  >
                    {addingId === productId ? "..." : "+"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Total Items</span>
            <span>{cart.items.reduce((acc, i) => acc + i.quantity, 0)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total Price</span>

            <span>₹{cart.totalPrice ?? 0}</span>
          </div>
          <button
            className="btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            <PaymentComponent />
          </button>
        </div>
      </div>
    </div>
  );
}
