import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import store from "../data/store.js";
import ApiError from "../utils/ApiError.js";

function createToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "1d" },
  );
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  const exists = store.users.find((user) => user.email === email);

  if (exists) {
    throw new ApiError(409, "Email already registered");
  }

  const user = {
    id: store.createId(),
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    role: "user",
  };

  store.users.push(user);

  res.status(201).json({
    success: true,
    message: "User registered",
    data: {
      user: publicUser(user),
      token: createToken(user),
    },
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = store.users.find((item) => item.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ApiError(401, "Invalid email or password");
  }

  res.json({
    success: true,
    message: "Login successful",
    data: {
      user: publicUser(user),
      token: createToken(user),
    },
  });
}

export async function profile(req, res) {
  res.json({
    success: true,
    data: req.user,
  });
}

export async function logout(req, res) {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
}
