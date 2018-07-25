const admin = require('firebase-admin');

module.exports = function (req, res, next) {
  const header = req.header('Authorization');
  const regex = /^Bearer\s(.*)$/;
  const match = regex.exec(header);
  if (match && match.length === 2) {
    const idToken = match[1];
    try {
      admin.auth().verifyIdToken(idToken).then(decodedToken => {
        req.user = decodedToken;
        next();
      }).catch(error => {
        console.error(error);
        next();
      });
    } catch (err) {
      next();
    }
  } else {
    next();
  }
};