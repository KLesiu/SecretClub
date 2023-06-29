var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require("bcryptjs")
require("dotenv").config()
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const passport = require('passport');
const User = require("./models/users")
const indexRouter = require('./routes/index');

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = `mongodb+srv://admin:${process.env.DATA_BASE_PASS}@cluster0.0jfaao7.mongodb.net/?retryWrites=true&w=majority`;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

//Passport
passport.use(
  new LocalStrategy(async(username, password, done) => {
    
    try {
    
      const user = await User.findOne({ name: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
           
            return done(null, user)
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
          }
        })
      
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});  

var app = express();
app.use(session({ secret: "programming", resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Local user var
app.use(function (req, res, next) {
  app.locals.currentUser = req.user;
  req.session.currentUser = req.user;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//Routes

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
