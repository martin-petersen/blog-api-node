const PostMethods = require("../db/modelos-tabelas/TabelaPost");
const NotFound = require("../error/NotFound");
const Sequelize = require("sequelize");

function listar() {
  return PostMethods.findAll();
}
function inserir(post) {
  return PostMethods.create(post);
}
async function buscarID(id) {
  const post = await PostMethods.findOne({
    where: {
      id: id,
    },
  });

  if (!post) {
    throw new NotFound("post não encontrado");
  }

  return post;
}
async function buscarConteudo(dados) {
  if (dados["q"] === "") {
    return PostMethods.findAll();
  }

  const res1 = await PostMethods.findAll({
    where: {
      title: {
        [Sequelize.Op.like]: `%${dados}%`,
      },
    },
  });

  const res2 = await PostMethods.findAll({
    where: {
      content: {
        [Sequelize.Op.like]: `%${dados}%`,
      },
    },
  });

  const res = res1.concat(res2);

  return res;
}
function atualizar(id, dados) {
  return PostMethods.update(dados, {
    where: {
      id: id,
    },
  });
}
function remover(id) {
  return PostMethods.destroy({
    where: {
      id: id,
    },
  });
}

module.exports = {
  listar,
  inserir,
  buscarID,
  buscarConteudo,
  atualizar,
  remover,
};
