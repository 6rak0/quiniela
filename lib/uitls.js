const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Entrada = require('mongoose').model('Entrada');

module.exports.genPassword = (password) => {
  const salt = crypto.randomBytes(64).toString('hex');
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return {
    salt: salt,
    hash: genHash,
  };
};

module.exports.validatePassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
};

module.exports.issueAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '7d' });
};

module.exports.validateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403).json(err);
    req.user = user;
    next();
  });
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'Acceso no autorizado, solo administradores.',
    });
  }
};

module.exports.determinaResultado = (gl, gv) => {
  if (gl == gv) return 'E';
  else if (gl > gv) return 'L';
  else return 'V';
};

module.exports.puntos = (jornada, id, resultado) => {
  Entrada.find({ jornada: jornada })
    .then((data) => {
      data.forEach((entrada) => {
        if (entrada.pred[id - 1] === resultado) {
          if (entrada.puntos == null) {
            Entrada.findOneAndUpdate(
              { jornada: jornada, username: entrada.username },
              { puntos: 1 },
              { useFindAndModify: false }
            ).catch((err) => console.log(err));
          } else {
            let puntos = entrada.puntos
            puntos++
            Entrada.findOneAndUpdate(
              { jornada: jornada, username: entrada.username },
              { puntos: puntos },
              { useFindAndModify: false }
            ).catch((err) => console.log(err));
          }
        }
      });
    })
    .catch((err) => console.log(err));
};
