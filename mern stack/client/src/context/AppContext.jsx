import { createContext, useContext, useMemo, useState } from "react";
import { dummyOrders, dummyProducts, dummyUsers } from "../data/dummyData.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState(dummyUsers);
  const [products, setProducts] = useState(dummyProducts);
  const [orders, setOrders] = useState(dummyOrders);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }

  // CONNECT HERE: replace with api.post("/api/auth/login", form)
  function login(form) {
    const found = users.find(
      (item) => item.email === form.email && form.password.length >= 6,
    );

    if (!found) {
      showToast("Dummy login failed — connect backend to use real auth");
      return false;
    }

    setUser(found);
    setToken("dummy-token");
    showToast(`Logged in as ${found.name} (dummy data)`);
    return true;
  }

  // CONNECT HERE: replace with api.post("/api/auth/register", form)
  function register(form) {
    const exists = users.some((item) => item.email === form.email);

    if (exists) {
      showToast("Email already exists in dummy data");
      return false;
    }

    const newUser = {
      id: `u${users.length + 1}`,
      name: form.name,
      email: form.email,
      role: "user",
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    setToken("dummy-token");
    showToast("Registered with dummy data — connect backend for real signup");
    return true;
  }

  function logout() {
    // CONNECT HERE: api.post("/api/auth/logout")
    setUser(null);
    setToken(null);
    setCart([]);
    showToast("Logged out (frontend only)");
  }

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`);
  }

  // CONNECT HERE: replace with api.post("/api/orders", { items })
  function placeOrder() {
    if (!user) {
      showToast("Login required");
      return;
    }

    if (!cart.length) {
      showToast("Cart is empty");
      return;
    }

    const order = {
      id: `o${orders.length + 1}`,
      userId: user.id,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "pending",
    };

    setOrders((prev) => [order, ...prev]);
    setCart([]);
    showToast("Order placed with dummy data");
  }

  const value = useMemo(
    () => ({
      user,
      token,
      cart,
      users,
      products,
      orders,
      toast,
      login,
      register,
      logout,
      addToCart,
      placeOrder,
      setProducts,
      setUsers,
      setOrders,
      showToast,
    }),
    [user, token, cart, users, products, orders, toast],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
