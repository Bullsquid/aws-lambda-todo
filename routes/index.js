const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  let name = null;
  if (req.user && req.user.name) {
    name = req.user.name;
  }
  res.send('It works' + (name ? `, ${name}` : ''));
});

module.exports = router;
