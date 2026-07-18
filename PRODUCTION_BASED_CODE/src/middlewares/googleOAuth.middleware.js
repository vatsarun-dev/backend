import passport from "passport";
import env from "../config/env.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const googleOAuthMiddleware = (app) => {
  app.use(passport.initialize());
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT,
        clientSecret: env.GOOGLE_SECRET,
        callbackURL: env.GOOGLE_CALLBACK,
      },
      (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile);
      },
    ),
  );
};

export default googleOAuthMiddleware;
