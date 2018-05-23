let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let passport = require('passport');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);

let app = express();

//database connection
let db = require('./config/connections.js')


//routes
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session 
app.use(session({
  secret:'SECR*T',
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    ttl: null,
    db: 0,
    pass: null,
    prefix: 'sess:'
  }),
  cookie: { secure: true },
  resave:false,
  saveUninitialized:true
}))


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.listen(1337)

module.exports = app;
