const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../html/login.html'));
});

module.exports = router;
