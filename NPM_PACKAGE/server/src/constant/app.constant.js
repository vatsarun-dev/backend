export default {
  PORT: 3000,
  MONGO_URL: "mongodb://0.0.0.0/constant",
};

export const app_constant = {
  cookie: {
    accessToken: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000,
    },
    refreshToken: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 30 * 60 * 1000,
    },
  },
};
