export default {
  PORT: 8000,
  MONGO_URL: "mongodb://0.0.0.0/production",
  NODE_ENV: "development",
  LOGGER: "info",
  WINDOWMS: 15 * 60 * 1000,
  LIMIT: 100,
};

export const app_constant = {
  cookie: {
    accessToken: {
      httpOnly: true,
      secure: false,
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    },

    refreshToken: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  },
};
