import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express from "express";
import env from "../config/env.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

const allowedOrigins = [
  env.CLIENT_URL,
  ...(env.ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()) || []),
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
].filter(Boolean);

const securityMiddlewares = (app) => {
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error(`CORS blocked origin: ${origin}`));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.use(express.json({ limit: "3mb" }));
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(
    rateLimit({
      windowMs: env.WINDOWMS,
      limit: env.LIMIT,
      legacyHeaders: true,
      message: "too many request",
    }),
  );
};
export default securityMiddlewares;
