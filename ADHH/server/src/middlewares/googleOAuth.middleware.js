import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import env from "../config/env.js";

export default function GoogleStrategyMiddlewares(params) {
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
}
