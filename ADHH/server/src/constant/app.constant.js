export default {
  PORT: 8000,
  MONGO_URL: "mongodb://0.0.0.0/amardeep",
  CLIENT_URL: "http://localhost:5173",
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
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    },
  },
};
