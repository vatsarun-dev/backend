import { Router } from "express";
// THIS LINE SAVE US TO IMPORT MANY THINGS REPEATLY
import * as controllers from "../controllers/auth.controller.js";
import { registerValidationRule } from "../validation/auth.validation.js";
const routes = Router();

routes.get("/", registerValidationRule, controllers.authController);

export default routes;
