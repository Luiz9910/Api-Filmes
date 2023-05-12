module.exports = function verificationAdmin(req, res, next) {
    if (req.user.role) {
      next();
    } else {
      res.status(403)
      res.json({response: 'You do not have permission to acess this.'});
    }
  }