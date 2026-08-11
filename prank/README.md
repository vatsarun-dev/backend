# 🎭 Paisa Double Yojana

A full-stack prank web app where users enter their crush's name and are tricked into paying ₹10 to "reveal their crush's phone number" — only to receive **+100 Experience Points** instead of any real number.

Built as a dark comedy experience inspired by 90s Bollywood, complete with a cinematic scene-by-scene flow, Razorpay payment integration, JWT authentication, and a prank reveal at the end.

---

## 🖥️ Live Demo

- **Frontend:** https://backend-rouge-ten-33.vercel.app
- **Backend:** https://backend-1-9jl7.onrender.com

---

## 📁 Project Structure

```
prank/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card.jsx         # Crush name search card
│   │   │   ├── Login.jsx        # Login form
│   │   │   ├── Register.jsx     # Register form
│   │   │   ├── Payment.jsx      # Pay Now button + result modal
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── hooks/
│   │   │   └── useRazorpay.js   # Razorpay checkout flow
│   │   ├── services/
│   │   │   └── api.js           # All Axios API calls
│   │   └── App.jsx              # Route definitions
│   ├── index.html
│   ├── .env                     # Frontend env vars
│   └── package.json
│
└── server/                  # Node.js + Express backend
    ├── src/
    │   ├── config/
    │   │   ├── env.js           # Zod env validation
    │   │   └── logger.js        # Pino logger
    │   ├── constant/
    │   │   └── app.constant.js  # Cookie settings
    │   ├── database/
    │   │   └── db.js            # MongoDB connection
    │   ├── middlewares/
    │   │   ├── isUser.middleware.js     # JWT auth guard
    │   │   ├── security.middleware.js   # CORS, helmet, rate limit
    │   │   └── errorHandler.middleware.js
    │   ├── models/
    │   │   ├── auth.model.js    # User schema
    │   │   ├── crush.model.js   # Crush name schema
    │   │   └── payment.model.js # Payment schema
    │   ├── modules/
    │   │   ├── auth/
    │   │   │   ├── auth.controller.js
    │   │   │   ├── auth.service.js
    │   │   │   └── auth.route.js
    │   │   └── payment/
    │   │       ├── payment.controller.js
    │   │       ├── payment.service.js
    │   │       └── payment.route.js
    │   ├── services/
    │   │   └── razorpay.js      # Razorpay instance + createOrder
    │   └── utils/
    │       ├── asyncHandler.js
    │       └── generateToken.js
    ├── server.js                # App entry point
    └── package.json
```

---

## ⚙️ Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| React Hook Form | Form handling |
| Styled Components | Component styling |
| Framer Motion | Animations |
| TailwindCSS | Utility styles |

### Backend
| Tool | Purpose |
|---|---|
| Node.js + Express 5 | Server |
| MongoDB + Mongoose | Database |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Razorpay SDK | Payment processing |
| Zod | Env variable validation |
| Pino | Logging |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |

---

## 🚀 Running Locally

### Prerequisites

Make sure you have these installed:
- Node.js v18 or higher
- npm
- MongoDB Atlas account (free tier works)
- Razorpay account (free test mode)

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/vatsarun-dev/backend.git
cd backend/prank
```

---

### Step 2 — Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```bash
cp .env.example .env
```

Now open `server/.env` and fill in the values:

```env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/prank
ACCESSTOKEN=any_random_long_string_here
REFRESHTOKEN=another_random_long_string_here
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
RAZORPAY_SECRET=your_razorpay_secret_here
FRONTNED_URL=http://localhost:5173
```

> See the **Razorpay Setup** section below to get `RAZORPAY_KEY_ID` and `RAZORPAY_SECRET`.

Start the backend:

```bash
npm start
```

Backend will run on **http://localhost:3000**

---

### Step 3 — Setup the Frontend

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on **http://localhost:5173**

---

## 💳 Razorpay Setup (Step by Step)

This is the most important part. Follow each step carefully.

### 1. Create a Razorpay Account

Go to https://razorpay.com and sign up for a free account. You do not need to complete KYC for test mode.

---

### 2. Get Your API Keys

1. Login to your Razorpay Dashboard
2. Click **Settings** in the left sidebar
3. Click **API Keys** tab
4. Click **Generate Test Key** button
5. You will see two values:
   - **Key ID** — looks like `rzp_test_XXXXXXXXXXXXXXXXXX`
   - **Key Secret** — looks like `XXXXXXXXXXXXXXXXXXXXXXXX`
6. Copy both values immediately. The secret is shown only once.

> ⚠️ Never commit these keys to GitHub. Never share them publicly. Put them only in your `.env` file.

---

### 3. Add Keys to Your .env

In your `server/.env`:

```env
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXXXX
RAZORPAY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
```

---

### 4. How Razorpay Works in This Project

This project uses the **Razorpay Standard Checkout** flow. Here is exactly what happens when a user clicks Pay:

```
User clicks "Pay Now"
        │
        ▼
Frontend calls GET /api/user/razorpay-key
        │  Backend reads RAZORPAY_KEY_ID from env
        │  Returns { keyId: "rzp_test_xxx" }
        │
        ▼
Frontend calls POST /api/payment/
        │  Backend creates a Razorpay order via Razorpay SDK
        │  Saves order to MongoDB with status "pending"
        │  Returns { order: { id, amount, currency } }
        │
        ▼
Frontend opens Razorpay checkout modal
        │  User fills card/UPI details on Razorpay's secure page
        │  User completes payment
        │
        ▼
Razorpay returns to handler function with:
        │  { razorpay_order_id, razorpay_payment_id, razorpay_signature }
        │
        ▼
Frontend calls POST /api/payment/verify
        │  Backend verifies signature using HMAC SHA256:
        │  expected = HMAC(order_id + "|" + payment_id, RAZORPAY_SECRET)
        │  Compares with razorpay_signature
        │  If match → updates payment status to "success" in MongoDB
        │
        ▼
Frontend shows success/failure image modal
```

---

### 5. Why the Key ID is Fetched from Backend

The Razorpay Key ID is technically a public key — but to avoid putting it in frontend environment variables (which get bundled into the JavaScript and are visible to anyone), this project fetches it from the backend at runtime via `GET /api/user/razorpay-key`.

This means:
- No Razorpay keys in frontend `.env`
- Key is only stored in server `.env`
- Works cleanly in all deployment environments

---

### 6. Test Payments

In test mode, use these Razorpay test credentials:

| Method | Details |
|---|---|
| **Test Card** | Card number: `4111 1111 1111 1111` |
| | Expiry: Any future date |
| | CVV: Any 3 digits |
| | OTP: `1234` |
| **Test UPI** | UPI ID: `success@razorpay` |
| **Net Banking** | Select any bank, use test credentials shown |

> These test credentials only work in test mode (keys starting with `rzp_test_`).

---

## 🔐 Authentication Flow

This project uses **JWT tokens stored in HTTP-only cookies** for authentication.

```
User registers / logs in
        │
        ▼
Backend generates:
  - accessToken  (expires in 15 minutes)
  - refreshToken (expires in 7 days)
        │
        ▼
Both tokens set as HTTP-only cookies
(also stored in localStorage as fallback for cross-origin deployments)
        │
        ▼
Every protected API request:
  - Reads token from Authorization header (Bearer token)
  - Falls back to cookie if header not present
  - Verifies JWT signature
  - Attaches user to req.user
        │
        ▼
On page refresh:
  Frontend calls GET /api/user/me
  Backend verifies token and returns user
  Session is restored automatically
```

---

## 📡 API Endpoints

### Auth Routes — `/api/user`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/api/user/register` | No | Register new user |
| POST | `/api/user/login` | No | Login |
| GET | `/api/user/me` | Yes | Get logged in user |
| GET | `/api/user/razorpay-key` | No | Get Razorpay key ID |
| POST | `/api/user/name` | Yes | Save crush name |

### Payment Routes — `/api/payment`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/api/payment/` | Yes | Create Razorpay order |
| POST | `/api/payment/verify` | Yes | Verify payment signature |

---

## 🗄️ Database Models

### User (`auth.model.js`)
```
name        String  required
email       String  required, unique
password    String  required (bcrypt hashed)
refreshToken String
```

### Crush (`crush.model.js`)
```
user        ObjectId  ref: userModel, required
crushName   String    required
timestamps  true
```

### Payment (`payment.model.js`)
```
user            ObjectId  ref: userModel
amount.value    Number
amount.currency String
status          String  (pending / success / failed)
razorpayDetails.orderId    String
razorpayDetails.paymentId  String
razorpayDetails.signature  String
timestamps      true
```

---

## 🌍 Deploying to Production

### Backend — Render

1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo
4. Set:
   - **Root Directory:** `prank/server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add all environment variables from the list below
6. Deploy

### Frontend — Vercel

1. Go to https://vercel.com → New Project
2. Import your GitHub repo
3. Set:
   - **Root Directory:** `prank/client`
   - **Framework Preset:** Vite
4. Add environment variable:
   ```
   VITE_URL=https://your-render-backend-url.onrender.com/api
   ```
5. Deploy

### Environment Variables for Production (Render)

| Variable | Value |
|---|---|
| `PORT` | `3000` |
| `MONGO_URL` | Your MongoDB Atlas connection string |
| `ACCESSTOKEN` | Any random secret string (min 32 chars) |
| `REFRESHTOKEN` | Any random secret string (min 32 chars) |
| `RAZORPAY_KEY_ID` | `rzp_test_XXXXXXXXXX` from Razorpay dashboard |
| `RAZORPAY_SECRET` | Your Razorpay secret from dashboard |
| `FRONTNED_URL` | Your Vercel frontend URL (no trailing slash) |

> ⚠️ `FRONTNED_URL` must exactly match your frontend domain with no trailing slash.
> Wrong: `https://myapp.vercel.app/`
> Correct: `https://myapp.vercel.app`

---

## 🐛 Common Issues

### 401 Unauthorized on payment
- Token is expired — log out and log in again
- Check `RAZORPAY_KEY_ID` and `RAZORPAY_SECRET` are correct on Render
- Razorpay keys may have been regenerated — update them on Render

### CORS error
- Make sure `FRONTNED_URL` on Render matches your Vercel URL exactly
- No trailing slash
- Must include `https://`

### Payment window opens but shows "Authentication failed"
- Your Razorpay keys are wrong or expired
- Go to Razorpay dashboard and regenerate keys
- Update on Render and redeploy

### Page goes blank after refresh (logged out)
- The `/api/user/me` call failed
- Check that your backend is running
- Check Render logs for errors

### `trust proxy` warning in Render logs
- Already fixed — `app.set("trust proxy", 1)` is set in security middleware

---

## 📝 Environment Variables Reference

### `server/.env`
```env
PORT=3000
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
ACCESSTOKEN=super_secret_access_token_string
REFRESHTOKEN=super_secret_refresh_token_string
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXXXX
RAZORPAY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
FRONTNED_URL=http://localhost:5173
```

### `client/.env`
```env
VITE_URL=http://localhost:3000/api
```

---

## 📄 License

MIT — use it however you want.

---

Built with chai, confusion, and creative deception. 🍵
