import express from "express";
import securityMiddlewares from "./middlewares/security.middleware.js";
import GoogleStrategyMiddlewares from "./middlewares/googleOAuth.middleware.js";
export default function createApp() {
  const app = express();

  securityMiddlewares(app);
  GoogleStrategyMiddlewares();

  return app;
}
