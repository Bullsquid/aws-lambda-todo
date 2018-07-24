let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.send("It works");
});

module.exports = router;
