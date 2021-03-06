var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var collectionsRouter = require('./routes/collections');
var userCenterRouter = require('./routes/userCenter');
var learningRouter = require('./routes/learning');
var loginRouter = require('./routes/login');
var learnSecondRouter = require('./routes/learnSecond');
var registerRouter = require('./routes/register');
var registerCheckRt = require('./routes/registerCheck');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'uta',
    cookie:{maxAge:60*1000*3},
    resave:false,
    saveUninitialized:true
}));

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/home',homeRouter);
app.use('/collections',collectionsRouter);
app.use('/userCenter',userCenterRouter);
app.use('/learning',learningRouter);
app.use('/login',loginRouter);
app.use('/learnSecond',learnSecondRouter);
app.use('/register',registerRouter);
app.use('/registerCheck',registerCheckRt);

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
