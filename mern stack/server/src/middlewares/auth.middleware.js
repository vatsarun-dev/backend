import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import store from "../data/store.js";

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "Access token required"));
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    const user = store.users.find((item) => item.id === decoded.id);

    if (!user) {
      return next(new ApiError(401, "Invalid token user"));
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
}

export function adminMiddleware(req, res, next) {
  if (req.user?.role !== "admin") {
    return next(new ApiError(403, "Admin access required"));
  }
  next();
}
