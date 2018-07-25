/**
 * Middleware that will fail unauthorized requests with 403 error
 */
module.exports = function (req, res, next) {
  if (!req.user) {
    res.status(403);
    res.json({
      code: 403,
      error: 'Unauthorized',
      message: 'Please add valid auth token to your request in Authorization header'
    });
  } else {
    next();
  }
};