const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert("private/firebase-service-account-key.json"),
  databaseURL: process.env.FIREBASE_DB_URL || "https://demoapi-3c0a8.firebaseio.com/"
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;
