const jwt = require("jsonwebtoken");
const config = require("config");

function gerarToken(user) {
  const paylod = {
    id: user.id,
  };

  const token = jwt.sign(paylod, config.get("token.senha"));
  return token;
}

module.exports = gerarToken;
