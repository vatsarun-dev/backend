export default async function isAdmin(err, req, res, next) {
  if (!req.user.role === "admin")
    return res.status(401).json({
      message: "access denied",
    });

  next();
}
