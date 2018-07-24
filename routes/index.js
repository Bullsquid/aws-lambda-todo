let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  let name = null;
  if (req.user && req.user.name) {
    name = req.user.name;
  }
  res.send("It works" + (name ? `, ${name}` : ''));
});

module.exports = router;
