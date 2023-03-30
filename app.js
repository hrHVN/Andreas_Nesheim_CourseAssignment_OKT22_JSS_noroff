const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

/*
Routers
*/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/authenticathe');


/*
Global variables
*/

// const SQLiteStore = require('connect-sqlite3')(session);
const app = express();
const JsonStore = require('express-session-json')(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'))

/* 
session setup
*/
console.log('before crash')

app.use(session({
  secret: 'temp',
  resave: false,
  saveUninitialized: false,
  store: new JsonStore()
}))

console.log('After crash?')

app.use(passport.authenticate('session'));

/*
  Paths
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: '.. rorre .. ', });
});

module.exports = app;
