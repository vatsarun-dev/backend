import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import morgan from "morgan";
export default function securityMiddleware(app) {
  app.use(morgan("dev"));
  app.use(express.json({ limit: "3mb" }));
  app.use(express.urlencoded({ extended: true, limit: "3mb" }));
  app.use(cookieParser());

  app.use(
    cors({
      origin: "http://localhost:3000/",
      withCredential: true,
    }),
  );
  app.use(passport.initialize());
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      message: "too much devices",
      limit: 100,
      legacyHeaders: true,
    }),
  );
}
