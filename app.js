var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var connectedUsers = {
  users : {},
  set : function(id, user) {
    // console.log('--- set')
    this.users[id] = user ;
    // console.log(this.users) ;
  },
  get : function(id){
    // console.log('--- get')
    // console.log(this.users) ;
    return this.users[id] ;
  }
}
var indexRouter = require('./routes/index')(connectedUsers);
var usersRouter = require('./routes/users')(connectedUsers);
var commentsRouter = require('./routes/comments')(connectedUsers);
var moviesRouter = require('./routes/movies')(connectedUsers);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/movies', moviesRouter);

/**
 * @author : Aina Nary
 */
var searchRouter = require('./routes/search')(connectedUsers);
app.use('/search', searchRouter);
var categoryRouter = require('./routes/category')(connectedUsers);
app.use('/category', categoryRouter);
var actorRouter = require('./routes/actor')(connectedUsers);
app.use('/actor', actorRouter);

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
