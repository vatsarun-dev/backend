const isProduction =
  process.env.NODE_ENV === "production" ||
  /^https:\/\//i.test(process.env.CLIENT_URL || "");

export default {
  PORT: 8000,
  MONGO_URL: "mongodb://0.0.0.0/amardeep",
  CLIENT_URL: "http://localhost:5173",
  PRODUCTION_CLIENT_URL: "https://backend-smhf.vercel.app",
  WINDOWMS: 15 * 60 * 1000,
  LIMIT: 100,
};

export const app_constant = {
  cookie: {
    accessToken: {
      httpOnly: true,
      secure: isProduction,
      maxAge: 15 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
    },

    refreshToken: {
      httpOnly: true,
      secure: isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
    },
  },
};
