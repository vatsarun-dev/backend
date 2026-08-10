import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import env from "../config/env.js";

export default function securityMiddleware(app) {
  app.use(morgan("dev"));
  app.use(express.json({ limit: "3mb" }));
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));
  app.use(cookieParser());

  // Strip trailing slash from FRONTNED_URL if present
  const allowedOrigin = env.FRONTNED_URL?.replace(/\/$/, "");
  console.log("Allowed origin:", allowedOrigin);

  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true,             // allow cookies cross-origin
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  // Handle preflight requests for all routes
  app.options("*", cors({
    origin: allowedOrigin,
    credentials: true,
  }));

  app.use(passport.initialize());
  app.use(hpp());

  // Helmet configured to not break cross-origin cookie flow
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );

  app.use(compression());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      message: "too many requests",
      limit: 100,
      legacyHeaders: true,
    }),
  );
}
