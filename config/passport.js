const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../api/models/user');
const config = require('../config/credentials');

module.exports = function(passport){

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      console.log(accessToken)
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (err) {
          console.log(err);
        }
        if (!err && user !== null) {
          user.token = accessToken;
          done(null, user);
        } else {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.email,
            created: Date.now()
          });
          user.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("saving user ...");
              done(null, user);
            }
          });
        }
      });
    }
  ));

}