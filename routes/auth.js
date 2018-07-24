const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const validate = require('express-validation');
const validation = require('../validations/auth-validation');
const path = require('path');

router.post('/register', validate(validation.createProfile), (req, res) => {
  const body = req.body;
  admin.auth().createUser({
    email: body.email,
    password: body.password,
    displayName: body.name,
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      res.json({
        status: 200,
        message: "Profile created",
        uid: userRecord.uid
      })
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
      let status = 500;
      if (error.errorInfo.code === "auth/email-already-exists") {
        status = 400;
      }
      res.status(status);
      res.json({
        status: status,
        message: error.message
      })
    });
});

router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname+'/../html/login.html'));
});

module.exports = router;
