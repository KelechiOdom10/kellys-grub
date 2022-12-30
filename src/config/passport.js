import express from "express";
import passport from "passport";
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
import mongoose from "mongoose";

const User = mongoose.model("User");

const isProduction = process.env.NODE_ENV === "production";
const serverUrl = !isProduction
  ? process.env.SERVER_URL_DEV
  : process.env.SERVER_URL_PROD;

/**
 *
 * @param {express.Request} req
 * @returns
 */
const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
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
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(currentUser => {
          if (currentUser) {
            return done(null, currentUser);
          }

          const newUser = new User({
            provider: "google",
            googleId: profile.id,
            username: profile.displayName,
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
        .catch(err => done(null, false));
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
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id })
        .then(currentUser => {
          if (currentUser) {
            return done(null, currentUser);
          }

          const newUser = new User({
            provider: "facebook",
            facebookId: profile.id,
            username: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null,
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
        .catch(err => done(null, false));
    }
  )
);
