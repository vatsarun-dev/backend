import { Router } from "express";

const appRoutes = Router();
appRoutes.get("/", (req, res) => {
  res.json("hii from docker");
});

export default appRoutes;
