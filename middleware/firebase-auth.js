const admin = require("firebase-admin");

module.exports = function (req, res, next) {
  const idToken = req.header("Authorization");
  try {
    admin.auth().verifyIdToken(idToken).then(decodedToken => {
      req.user = decodedToken;
      next();
    }).catch(error => {
      console.error(error);
      next();
    });
  } catch (err) {
    next()
  }
};