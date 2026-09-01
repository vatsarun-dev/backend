import userModel from "../model/app.model.js";
export default async function registerController(req, res) {
  const { name, email, password, mobile } = req.body;
  const user = await userModel.create({ name, email, password, mobile });
  return res.status(201).json({
    message: "User created successfully",
    user: user,
  });
}
