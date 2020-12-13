const Post = require("./post-model").Post;
const Carregar = require("./post-model");
const Serializador = require("../serializer/Serializador").SerializadorPost;

async function listarPosts(req, res) {
  const resultados = await Carregar.listarTodos();
  const serializador = new Serializador();
  res.send(serializador.serializarLista(resultados));
}
async function listarUm(req, res, next) {
  const id = req.params.id;
  const serializador = new Serializador();
  const post = new Post({ id: id });
  try {
    const resposta = await post.carregar();
    res.send(serializador.serializarObjeto(resposta));
  } catch (err) {
    next(err);
  }
}
async function buscarConteudo(req, res, next) {
  const qParam = req.query.q;
  const serializador = new Serializador();
  const post = new Post({ title: qParam });
  try {
    const resultados = await post.buscarPorConteudo();
    res.send(serializador.serializarLista(resultados));
  } catch (err) {
    next(err);
  }
}
async function cadastrarPost(req, res, next) {
  const dadosRecebidos = req.body;
  const user = req.user;
  const serializador = new Serializador();
  const post = new Post({
    title: dadosRecebidos.title,
    content: dadosRecebidos.content,
    userId: user.id,
  });
  try {
    await post.criar();
    res.status(201);
    res.send(serializador.serializarNovoPost(post));
  } catch (err) {
    next(err);
  }
}
async function atualizarPost(req, res, next) {
  const userId = req.user.id;
  const id = req.params.id;
  const dadosRecebidos = req.body;
  const serializador = new Serializador();
  const post = new Post({
    id: id,
    title: dadosRecebidos.title,
    content: dadosRecebidos.content,
    userId: userId,
  });
  try {
    const novoPost = await post.atualizar();
    res.send(serializador.serializarNovoPost(novoPost));
  } catch (err) {
    next(err);
  }
}
async function deletarPost(req, res, next) {
  const id = req.params.id;
  const userId = req.user.id;
  const post = new Post({ id: id });
  try {
    await post.carregar();
    await post.remover(userId);
    res.status(204);
    res.end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listarPosts,
  listarUm,
  buscarConteudo,
  cadastrarPost,
  atualizarPost,
  deletarPost,
};
