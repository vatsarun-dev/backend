import { Router } from "express";
import registerController from "../controller/app.controller.js";
const appRoutes = Router();

appRoutes.post("/api/register", registerController);
export default appRoutes;
