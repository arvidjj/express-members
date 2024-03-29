require("dotenv").config(); 
var createError = require('http-errors');
const express = require('express');
const jwt = require('jsonwebtoken');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//mongoose
const mongoose = require("mongoose");

//passport
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport-config'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

//mongodb connect
mongoose.connect(process.env.MONGODB_URL);

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
