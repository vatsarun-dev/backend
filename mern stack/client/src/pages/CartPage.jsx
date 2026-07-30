import { useApp } from "../context/AppContext.jsx";

export default function CartPage() {
  const { cart, placeOrder, user } = useApp();
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="page">
      <section className="panel">
        <h2>Shopping Cart</h2>

        {!cart.length ? (
          <p className="hint">Your cart is empty</p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-footer">
              <strong>Total: ${total.toFixed(2)}</strong>
              <button type="button" onClick={placeOrder} disabled={!user}>
                Place Order
              </button>
            </div>
          </>
        )}

        <p className="connect-note">
          CONNECT HERE: call <code>POST /api/orders</code> with cart items
        </p>
      </section>
    </div>
  );
}
