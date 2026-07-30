import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Layout from "./components/Layout.jsx";
import Toast from "./components/Toast.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import CartPage from "./pages/CartPage.jsx";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route path="users" element={<UsersPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}
