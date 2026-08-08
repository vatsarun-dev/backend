import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Card from "./components/Card.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <div className="bg-[url(https://i.pinimg.com/736x/55/b0/a4/55b0a41d61d50b4da7df54d6a8b1fe8d.jpg)] bg-no-repeat bg-cover bg-center min-h-screen w-full flex items-center justify-center">
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route — only accessible when logged in */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Card />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </div>
  );
}
