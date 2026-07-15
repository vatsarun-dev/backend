import express from "express";
import routes from "./routes/auth.route.js";
const app = express();

app.use("/api/auth", routes);

export default app;
