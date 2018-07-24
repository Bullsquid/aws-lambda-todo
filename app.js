const express = require('express');
const logger = require('morgan');
const jsonErrorHandler = require('express-json-error-handler');
const expressValidation = require('express-validation');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert("private/firebase-service-account-key.json"),
  databaseURL: process.env.FIREBASE_DB_URL || "https://demoapi-3c0a8.firebaseio.com/"
});

const auth = require('./middleware/firebase-auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRouter);
app.use('/', auth, indexRouter);

app.use((err, req, res, next) => {
  // specific for validation errors
  if (err instanceof expressValidation.ValidationError) {
    return res.status(err.status).json(err);
  }

  next(err);
});
app.use(jsonErrorHandler.default());

module.exports = app;
