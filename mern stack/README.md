# MERN Stack — Complex Frontend & Backend (NOT Connected)

Two standalone apps for practicing manual frontend ↔ backend connection.

```
mern stack/
├── client/   → React app (dummy data only)
└── server/   → Express REST API (in-memory data)
```

They do **not** talk to each other yet.

---

## Run Backend

```bash
cd "mern stack/server"
npm install
npm run dev
```

Server: **http://localhost:5000**

Test alone with Postman:

| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | `{ name, email, password }` |
| POST | `/api/auth/login` | `{ email, password }` |
| GET | `/api/auth/profile` | Bearer token required |
| GET | `/api/products` | Optional `?search=&category=` |
| GET | `/api/products/:id` | Single product |
| POST | `/api/products` | Admin + token |
| GET | `/api/orders` | Token required |
| POST | `/api/orders` | `{ items: [{ productId, quantity }] }` |
| GET | `/api/users` | Admin + token |

**Demo login:** `alice@example.com` / `password123` (admin)

---

## Run Frontend

```bash
cd "mern stack/client"
npm install
npm run dev
```

Frontend: **http://localhost:5173**

Uses **dummy data** in the browser. UI includes:

- Home dashboard
- Login / Register
- Products with search & filter
- Cart & place order
- Orders page
- Admin users page

---

## Where to connect manually

Look for **`CONNECT HERE`** comments:

| File | What to wire |
|------|--------------|
| `client/.env.example` | `VITE_API_URL` |
| `client/src/config/axiosInstance.js` | `baseURL` |
| `client/src/context/AppContext.jsx` | login, register, logout, placeOrder |
| `client/src/pages/*.jsx` | fetch products, orders, users |
| `server/src/app.js` | CORS origin for frontend |

---

## Suggested connection flow

1. Set `VITE_API_URL=http://localhost:5000` in `client/.env`
2. Add `baseURL` in `axiosInstance.js`
3. Add CORS in server: `origin: "http://localhost:5173"`
4. Replace dummy functions in `AppContext.jsx` with axios calls
5. Replace dummy lists in pages with API responses
