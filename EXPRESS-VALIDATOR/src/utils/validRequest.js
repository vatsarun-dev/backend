import { validationResult } from "express-validator";

export const validRequest = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) return res.status(422).json({ error: error.array() });
  next();
};
