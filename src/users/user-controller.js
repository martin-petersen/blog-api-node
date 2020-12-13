const TabelaUser = require("./user-dao");
const User = require("./user-model");
const Seriliazador = require("../serializer/Serializador").SerializadorUser;
const { gerarToken } = require("../security");

async function login(requisicao, resposta) {
  const token = gerarToken(requisicao.user);
  console.log(requisicao.user);
  resposta.status(200);
  resposta.send({
    token: token,
  });
}
async function listarUsers(requisicao, resposta) {
  const resultados = await TabelaUser.listar();
  const serializador = new Seriliazador();
  resposta.status(200);
  resposta.send(serializador.serializarLista(resultados));
}
async function buscarUm(requisicao, resposta, next) {
  const id = requisicao.params.id;
  const user = new User({ id: id });
  const serializador = new Seriliazador();
  try {
    await user.carregar();
    resposta.send(serializador.serializarObjeto(user));
  } catch (err) {
    next(err);
  }
}
async function cadastrar(requisicao, resposta, next) {
  const dadosRecebidos = requisicao.body;
  console.log(requisicao.body);
  const user = new User(dadosRecebidos);
  try {
    await user.criar();
    const token = gerarToken(user);
    resposta.status(201);
    resposta.send({
      token: token,
    });
  } catch (err) {
    next(err);
  }
}
async function deletarUser(requisicao, resposta, next) {
  const id = requisicao.user.id;
  const user = new User({ id: id });
  try {
    await user.carregar();
    await user.remover();
    resposta.status(204);
    resposta.end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  listarUsers,
  cadastrar,
  buscarUm,
  deletarUser,
};
