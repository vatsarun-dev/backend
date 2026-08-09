export default {
  PORT: 3000,
  MONGO_URL: "mongodb://0.0.0.0/constant",
};

export const app_constant = {
  cookie: {
    accessToken: {
      httpOnly: true,
      sameSite: "none",             // required for cross-origin cookies
      secure: true,                 // required when sameSite is "none"
      maxAge: 15 * 60 * 1000,
    },
    refreshToken: {
      httpOnly: true,
      sameSite: "none",             // required for cross-origin cookies
      secure: true,                 // required when sameSite is "none"
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  },
};
