var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./modules/database');

var indexRouter = require('./routes/index');
var cardsRouter = require('./routes/cards');
var classRouter = require('./routes/playerClasses');

var app = express();

var mongo_uri = process.env.MONGODB_URI || "mongodb://localhost:27017/hearthstone";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cards', cardsRouter);
app.use('/player-classes', classRouter);

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

database.connect(mongo_uri, async error => {
    if(error){
        console.log(error);
        process.exit(1);
        return;
    }

    app.listen(process.env.PORT || 3000, () => console.log('let\'s do this'));
});