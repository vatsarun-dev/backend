import store from "../data/store.js";
import ApiError from "../utils/ApiError.js";

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function getUsers(req, res) {
  res.json({
    success: true,
    count: store.users.length,
    data: store.users.map(publicUser),
  });
}

export async function getUserById(req, res) {
  const user = store.users.find((item) => item.id === req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({ success: true, data: publicUser(user) });
}

export async function updateUser(req, res) {
  const user = store.users.find((item) => item.id === req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;

  res.json({
    success: true,
    message: "User updated",
    data: publicUser(user),
  });
}

export async function deleteUser(req, res) {
  const index = store.users.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    throw new ApiError(404, "User not found");
  }

  const [removed] = store.users.splice(index, 1);

  res.json({
    success: true,
    message: "User deleted",
    data: publicUser(removed),
  });
}
