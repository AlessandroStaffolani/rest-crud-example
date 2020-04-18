const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const boolParser = require('express-query-boolean');
const logger = require('morgan');
const db = require('./db');
const ResponseObject = require('./utils/ResponseObject');

const app = express();

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(logger('dev'));
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(boolParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexApi = require('./api/routes/index');
const studentApi = require('./api/routes/student');
const universityApi = require('./api/routes/university');

app.use('/', indexApi);
app.use('/api/v1/students', studentApi);
app.use('/api/v1/universities', universityApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not found');
    err.status = 404
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    const status = err.status || 500
    const error = req.app.get('env') === 'development' ? err : {}
    res.status(status).json(new ResponseObject(status, err.message, {error}));
});

module.exports = app;
