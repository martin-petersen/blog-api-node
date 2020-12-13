const UserMethods = require("../db/modelos-tabelas/TabelaUser");
const NotFound = require("../error/NotFound");
const BadRequest = require("../error/BadRequest");

function listar() {
  return UserMethods.findAll();
}
function inserir(user) {
  return UserMethods.create(user);
}
async function buscarID(id) {
  const user = await UserMethods.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new NotFound("usuário não encontrado");
  }

  return user;
}
async function buscarEmail(email) {
  const user = await UserMethods.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new BadRequest("campos inválidos");
  }

  return user;
}
function remover(id) {
  return UserMethods.destroy({
    where: {
      id: id,
    },
  });
}

module.exports = {
  listar,
  inserir,
  buscarID,
  buscarEmail,
  remover,
};
