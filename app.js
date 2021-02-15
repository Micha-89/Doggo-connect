// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");




// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();
// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const session = require('express-session')
const bcrypt=require('bcrypt')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session);
const LocalStrategy=require('passport-local').Strategy;
const User = require('./models/User.js')
const Dog = require('./models/Dog.js')
const mongoose=require('mongoose');
// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "DoggoConnect";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

//SESSION CONFIG
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false, // <== false if you don't want to save empty session object to the store
    // cookie: {
      // sameSite: 'none',
      // httpOnly: true,
      // maxAge:  60 * 1000 *60
    // },
    // store: new MongoStore({
      // mongooseConnection: mongoose.connection,
      // 
    // })
    
  })
);
//defining strategy
passport.serializeUser((user, cb) => cb(null, user._id));
 
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
}); 
passport.use(
  new LocalStrategy((username, password, done) => {
    // login
    User.findOne({ username: username })
      .then(userFromDB => {
        if (userFromDB === null) {
          // there is no user with this username
          done(null, false, { message: 'Wrong Credentials' });
        } else if (!bcrypt.compareSync(password, userFromDB.password)) {
          // the password is not matching
          done(null, false, { message: 'Wrong Credentials' });
        } else {
          // the userFromDB should now be logged in
          done(null, userFromDB)
        }
      })
      .catch(err => {
        console.log(err);
      })
  })
)

app.use(passport.initialize());
app.use(passport.session());

// ℹ️ Connects to the database
// require("./db");
require("./db/index.js")

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/", auth);

const private = require("./routes/private");
app.use("/", private);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;