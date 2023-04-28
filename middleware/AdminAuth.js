module.exports = function verificaAdmin(req, res, next) {
    if (req.user.role) {
      next();
    } else {
      res.status(403).send('Acesso negado. Você não é um admin.');
    }
  }