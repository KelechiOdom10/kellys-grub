import { Request } from "express";
import passport from "passport";
import passportJwt from "passport-jwt";
import passportGoogle from "passport-google-oauth2";
import passportFacebook from "passport-facebook";
import User from "~/models/userModel";

const JwtStrategy = passportJwt.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = !isProduction
  ? process.env.SERVER_URL_DEV
  : process.env.SERVER_URL_PROD;

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const opts: passportJwt.StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .select("-password -updatedAt -createdAt")
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => done(err, false));
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${serverUrl}/api/${process.env.GOOGLE_CALLBACK_URL}`,
    },
    (_accessToken, _refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(currentUser => {
          if (currentUser) {
            return done(null, currentUser);
          }

          const newUser = new User({
            provider: "Google",
            googleId: profile.id,
            fullName: profile.displayName,
            email: profile.email,
            avatar: profile.picture,
            password: null,
          });

          newUser.save((err, user) => {
            if (err) {
              return done(null, false);
            }

            return done(null, user);
          });
        })
        .catch(_err => done(null, false));
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${serverUrl}/api/${process.env.FACEBOOK_CALLBACK_URL}`,
      profileFields: ["id", "displayName", "name", "emails", "photos"],
    },
    (accessToken, _refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id })
        .then(currentUser => {
          if (currentUser) {
            return done(null, currentUser);
          }

          const newUser = new User({
            provider: "Facebook",
            facebookId: profile.id,
            fullName: profile.displayName,
            email: profile.emails
              ? profile.emails[0].value
              : profile._json.email,
            avatar: profile.photos
              ? profile.photos[0].value
              : `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}&&redirect=false`,
            password: null,
          });

          newUser.save((err, user) => {
            if (err) {
              return done(null, false);
            }

            return done(null, user);
          });
        })
        .catch(_err => done(null, false));
    }
  )
);
