var express = require('express');
var app = express();

var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//This tells express to use the express-session middleware and configures it with a secret key and a couple of other recommended settings
app.use(expressSession({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());

// This makes sure our app is using passport.session middleware! This will allow us to use passport to create express sessions. Passport does this by serializing our user data.
app.use(passport.session());

//This code supplies passport with the serializeUser callback function:
passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.use(new LocalStrategy(function(username, password, done) {
  if ((username === "john") && (password === "password")) {
    return done(null, { username: username, id: 1 });
  } else {
    return done(null, false);
  }
}));

///////////get posts etc
app.get('/success', function(req, res) {
  res.send("Hey, hello from the server!");
})

app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/login',

}));






app.listen(8000, function() {
  console.log("Ready for some authentication action");
})