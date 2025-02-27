var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const index = require('./routes/index'),
  movie = require('./routes/movie'),
  users = require('./routes/users'),
  auth = require('./routes/auth'),
  authMiddleware = require('./middleware/auth')
var app = express();

const mongoose = require('mongoose'),
      conf= require('./lib/config')
mongoose.connect(`mongodb:\/\/${conf.host}/${conf.database}`)
mongoose.connection.on('connected',()=>{
  console.log(`conectado a mongodb DATABASE ${conf.database}`);
})
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index)
app.use('/user', users)
app.use('/auth',auth)
app.use(authMiddleware)
app.use('/movie', movie)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
