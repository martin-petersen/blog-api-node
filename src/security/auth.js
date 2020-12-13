const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../users/user-model");
const bcrypt = require("bcrypt");
const { BadRequest, Unauthorized } = require("../error");
const jwt = require("jsonwebtoken");
const config = require("config");
const BearerStrategy = require("passport-http-bearer").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, senha, next) => {
      const user = new User({ email: email, password: senha });
      try {
        await user.buscarEmail();
        await validarSenhaUser(senha, user.password);
        next(null, user);
      } catch (err) {
        next(err);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, next) => {
    try {
      const payload = jwt.verify(token, config.get("token.senha"));
      const user = new User({ id: payload.id });
      await user.carregar();
      next(null, user);
    } catch (err) {
      next(err);
    }
  })
);

async function validarSenhaUser(senha, hash) {
  const senhaValida = await bcrypt.compare(senha, hash);
  if (!senhaValida) {
    throw new BadRequest("campos inválidos");
  }
}
