export const authController = async (req, res) => {
  let { email, contact, password } = req.body;

  if (!email || !contact || !password)
    throw new Error("all fields are required");

  const user = {
    email,
    contact,
    password,
  };

  return res.status(200).json({
    message: "all details",
    user,
  });
};
