import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express from "express";
import env from "../config/env.js";
import passport from "passport";
import cookieParser from "cookie-parser";
const securityMiddlewares = (app) => {
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
