import express from "express";
import securityMiddlewares from "./middlewares/security.middleware.js";
import googleOAuthMiddleware from "./middlewares/googleOAuth.middleware.js";
import routes from "./modules/auth/auth.route.js";
import env from "./config/env.js";
import morgan from "morgan";

export default function createApp() {
  const app = express();
  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    securityMiddlewares(app);
    googleOAuthMiddleware(app);
    app.use("/api/user", routes);

    app.use("/", (req, res) => {
      res.send("bhai api crash hogyi");
    });
  }

  return app;
}
