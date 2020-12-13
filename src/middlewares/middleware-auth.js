const passport = require("passport");
const { BadRequest } = require("../error");

function local(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "") {
    throw new BadRequest("email não pode ser vazio");
  }
  if (!email) {
    throw new BadRequest("email é obrigatório");
  }
  if (password === "") {
    throw new BadRequest("password não pode ser vazio");
  }
  if (!password) {
    throw new BadRequest("password é obrigatório");
  }
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
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

module.exports = local;
