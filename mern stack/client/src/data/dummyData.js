export const dummyUsers = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: "u2", name: "Bob Smith", email: "bob@example.com", role: "user" },
  { id: "u3", name: "Charlie Brown", email: "charlie@example.com", role: "user" },
];

export const dummyProducts = [
  { id: "p1", name: "Wireless Headphones", price: 79.99, category: "electronics", stock: 25 },
  { id: "p2", name: "Running Shoes", price: 59.99, category: "sports", stock: 40 },
  { id: "p3", name: "Coffee Maker", price: 129.99, category: "home", stock: 12 },
  { id: "p4", name: "Desk Lamp", price: 34.99, category: "home", stock: 18 },
  { id: "p5", name: "Smart Watch", price: 199.99, category: "electronics", stock: 8 },
];

export const dummyOrders = [
  {
    id: "o1",
    userId: "u2",
    items: [{ productId: "p1", quantity: 1, price: 79.99 }],
    total: 79.99,
    status: "delivered",
  },
  {
    id: "o2",
    userId: "u2",
    items: [{ productId: "p2", quantity: 2, price: 59.99 }],
    total: 119.98,
    status: "pending",
  },
];

export const categories = ["all", "electronics", "sports", "home"];
