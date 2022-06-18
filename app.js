var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const bikeList = require('./public/data/bike.js');
const carList = require('./public/data/car.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/auto/:autoType', async (req, res) => {
  const auto = req.params.autoType.toLowerCase()
  console.log(`User is asking for ${auto}`,auto)
  if (auto == "car") {
    res.send({
      status: 200,
      message: "Successfully get Menu",
      auto: carList
    })
  } else if (auto == "bike") {
    res.send({
      status: 200,
      message: "Successfully get Menu",
      auto: bikeList
    })
  }
  else {
    res.send({
      status: 400,
      auto: "No Inventory present",
      message: "We are not serving this menu currently.Please, choose from either bike or cars"
    })
  }
})

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
  res.render('error');
});

module.exports = app;


