const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userService = require('../service/userService');
const userService = new UserService();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (token, tokenSecret, profile, done) => {
      try {
          const { email, name } = profile._json;
          const user = await userService.findUserByEmail(email);

          if (user) {
              return done(null, user); // Return existing user
          } else {
              // If user does not exist, create new user
              const newUser = await userService.createUser({ name, email });
              return done(null, newUser);
          }
      } catch (error) {
          return done(error, null);
      }
  }
));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});