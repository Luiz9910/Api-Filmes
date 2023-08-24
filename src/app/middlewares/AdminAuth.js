module.exports = function verificationAdmin(req, res, next) {
    if (req.user.role) {
      next();
    } else {
      res.status(403).json({response: "You don't have permission to acess this."});
    }
}
