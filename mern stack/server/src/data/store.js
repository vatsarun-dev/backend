import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

const users = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "admin",
  },
  {
    id: "u2",
    name: "Bob Smith",
    email: "bob@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "user",
  },
];

const products = [
  {
    id: "p1",
    name: "Wireless Headphones",
    price: 79.99,
    category: "electronics",
    stock: 25,
  },
  {
    id: "p2",
    name: "Running Shoes",
    price: 59.99,
    category: "sports",
    stock: 40,
  },
  {
    id: "p3",
    name: "Coffee Maker",
    price: 129.99,
    category: "home",
    stock: 12,
  },
];

const orders = [
  {
    id: "o1",
    userId: "u2",
    items: [{ productId: "p1", quantity: 1, price: 79.99 }],
    total: 79.99,
    status: "delivered",
  },
];

const store = {
  users,
  products,
  orders,
  createId: () => uuid(),
};

export default store;
