module.exports.extractUser = (req) => {
  const { username, _id, isAdmin } = req.user
  return { user: { username, _id, isAdmin } }
}

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.status(401).json({ msg: 'Acceso no autorizado' });
  }
}

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
      next();
  } else {
      res.status(401).json({ msg: 'Acceso no autorizado, solo administradores.' });
  }
}