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
  // Required for Render/proxied deployments — fixes rate limiter X-Forwarded-For error
  app.set("trust proxy", 1);

  app.use(morgan("dev"));
  app.use(express.json({ limit: "3mb" }));
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));
  app.use(cookieParser());

  // Strip trailing slash from origin if present
  const allowedOrigin = env.FRONTNED_URL?.replace(/\/$/, "");
  console.log("Allowed origin:", allowedOrigin);

  app.use(
    cors({
      origin: allowedOrigin,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(passport.initialize());
  app.use(hpp());

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
