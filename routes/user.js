const UserController = require('../api/controllers/UserController');
const passport = require('passport');
module.exports=(app)=>{

app.post('/user', UserController.Create);


app.get('/auth/google', 
passport.authenticate('google',{ scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profiles.read',
    'https://www.googleapis.com/auth/userinfo.email'
  ]}
));

  app.get('/user/googlecallback', function (req, res) {
    console.log("GOOGLE CALLBACK");
    passport.authenticate('google', function (err, profile, info) {
      console.log("PROFILE: ", profile);
      return res.json(profile)
    })(req, res); // you to call the function retuned by passport.authenticate, with is a midleware.
  });

}

