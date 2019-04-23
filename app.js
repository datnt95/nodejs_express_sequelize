'use strict';

const config = require('config');
const cors = require('cors');
const log4js = require('log4js');
const log4jsExtend = require('log4js-extend');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const httpStatusCode = require('http-status-codes');
const multer = require('multer');

const resultDto = require('./common/dto/result');
const messageCodes = require('./common/message-codes');
const syncRouter = require('./routes/sync');

const app = express();

// Set configuration for multer
const storage = multer.diskStorage({
  'destination': (req, file, cb) => {
    cb(null, 'public/uploads');
  }
});
const upload = multer({ 'storage': storage, 'limits': { 'fileSize': 1000 * 1000 * 3 } }).any();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ 'extended': false }));

const BASE_URL = config.get('baseUrl');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(BASE_URL + '/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'data')));
app.use(BASE_URL + '/images', express.static(path.join(__dirname + '/uploads')));

/* Load log4js configuration */
try {
  const logConfig = config.get('logConfig');
  log4js.configure(logConfig);
} catch (error) {
  throw error;
}

/* Use for format log file */
log4jsExtend(log4js, {
  'path': __dirname,
  'format': 'at @name (@file:@line:@column)'
});

/* Logger */
const log = log4js.getLogger();
log.debug('Starting server...!');

app.use((req, res, next) => {
  res.sendError = error => {
    log.error('Error before sending response: ', error);
    // Detect an error throw by Assets360 or default error message
    // eslint-disable-next-line no-prototype-builtins
    if (error && error.hasOwnProperty('httpCode')) {
      return res.status(error.httpCode).send(error);
    }

    res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(resultDto.internalServerError(messageCodes.E001));
  };

  res.sendSuccess = (result) => {
    return res.send(result);
  };

  next();
});

app.use(function (req, res, next) {
  log.debug(' ==== Request information ==== ');
  log.debug('Original URL: ', req.originalUrl);
  log.debug('Method: ', req.method);
  log.debug('Path params: ', req.params);
  log.debug('Query params: ', req.query);
  log.debug('Body: ', req.body);
  log.debug(' ==== End request information ==== ');

  next();
});

app.use(BASE_URL + '/sync', syncRouter);

/**
 * Catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = httpStatusCode.NOT_FOUND;
  next(err);
});

app.use(bodyParser.json({
  'limit': '50mb'
}));

app.use((err, req, res, next) => {
  if (err) {
    return res.sendError(err);
  }

  next();
});

/**
 * Catch sigterm event
 */
process.on('SIGTERM', () => {
  log.debug('Catch SIGTERM event');
  // Shutdown log4js and kill process
  log4js.shutdown(() => {
    process.exit(1);
  });
});

/**
 * Handling uncaught exception
 */
process.on('uncaughtException', (error) => {
  log.debug('Catch uncaughtException event with error: ', error);
  // Shutdown log4js and kill process
  log4js.shutdown(() => {
    process.exit(1);
  });
});

app.use(BASE_URL, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      log.debug('Upload file failed. Error: ', err);
      res.sendError(err);
    }
    next();
  });
});

/**
 * Error handler
 * Development error handler
 * Will print stacktrace
 */
app.use((err, req, res) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || httpStatusCode.INTERNAL_SERVER_ERROR);

  log.debug('Error handler get error message: ', err.message);
  res.send(resultDto.internalServerErrorResult(messageCodes.E005));
});

/**
 * Production error handler
 * No stack traces leaked to user
 */
app.use((err, req, res) => {
  res.status(err.status || httpStatusCode.INTERNAL_SERVER_ERROR);
  log.debug('Production error handler get error message: ', err.message);
  res.send(resultDto.internalServerErrorResult(messageCodes.E005));
});

module.exports = app;
