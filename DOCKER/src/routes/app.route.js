import { Router } from "express";

const appRoutes = Router();
appRoutes.get("/", (req, res) => {
  res.json("hii from docker");
});

appRoutes.get("/test", (req, res) => {
  res.json("testing successfully");
});
appRoutes.get("/testing-1", (req, res) => {
  res.json("testing successfully");
});
appRoutes.get("/testing-2", (req, res) => {
  res.json("testing successfully");
});
export default appRoutes;
