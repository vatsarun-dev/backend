const registerService = require("../services/user.service");
const registerController = async (req, res) => {
  const result = await registerService(req.body);
  console.log(result);
  res.status(201).json({
    message: "User registered successfully",
    token: result.token,
    user: {
      id: result.user._id,
      name: result.user.name,
      email: result.user.email,
    },
  });
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = AuthService.generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerController,
  loginController,
};
