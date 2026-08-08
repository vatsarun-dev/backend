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
      maxAge: 15 * 60 * 1000,        // 15 minutes — matches token expiry
    },
    refreshToken: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days — matches token expiry
    },
  },
};
