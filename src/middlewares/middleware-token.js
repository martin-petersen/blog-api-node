const { JsonWebTokenError } = require("jsonwebtoken");
const passport = require("passport");

function bearer(req, res, next) {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (err && err instanceof JsonWebTokenError) {
      res.status(401);
      return res.send({
        mensagem: "token expirado ou inválido",
      });
    }

    if (!user) {
      res.status(401);
      return res.send({
        mensagem: "token não encontrado",
      });
    }

    req.user = user;
    next(null, user);
  })(req, res, next);
}

module.exports = bearer;
