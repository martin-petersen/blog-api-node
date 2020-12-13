const TabelaPost = require("./post-dao");
const { BadRequest, Unauthorized } = require("../error");
const User = require("../users/user-model");
class Post {
  constructor({ id, title, content, userId, published, updated, version }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.published = published;
    this.updated = updated;
    this.version = version;
  }

  async carregar() {
    const resultado = await TabelaPost.buscarID(this.id);
    this.title = resultado.title;
    this.content = resultado.content;
    this.userId = resultado.userId;
    this.published = resultado.published;
    this.updated = resultado.updated;

    const user = new User({ id: this.userId });
    await user.carregar();

    resultado.userId = user;

    const createdBRTZ = new Date(resultado.published);
    createdBRTZ.setHours(createdBRTZ.getHours() - 3);

    const updatedBRTZ = new Date(resultado.updated);
    updatedBRTZ.setHours(updatedBRTZ.getHours() - 3);

    const res = {
      id: resultado.id,
      published: createdBRTZ,
      updated: updatedBRTZ,
      title: resultado.title,
      content: resultado.content,
      user: resultado.userId,
    };

    return res;
  }

  async criar() {
    this.validar();
    const resultado = await TabelaPost.inserir({
      title: this.title,
      content: this.content,
      userId: this.userId,
    });
    this.id = resultado.id;
    this.published = resultado.published;
    this.updated = resultado.updated;
    this.version = resultado.version;
  }

  async atualizar() {
    this.validar();
    const dadosAtt = { title: this.title, content: this.content };

    const post = await TabelaPost.buscarID(this.id);

    this.verificarUser(this.userId, post);

    await TabelaPost.atualizar(this.id, dadosAtt);

    const postAtualizado = TabelaPost.buscarID(this.id);

    return postAtualizado;
  }

  async buscarPorConteudo() {
    const resultado = await TabelaPost.buscarConteudo(this.title);

    const res = this.removendoDuplicatas(resultado);

    for (let i = 0; i < res.length; i++) {
      const user = new User({ id: res[i].userId });
      await user.carregar();
      res[i].userId = user;
    }

    const resposta = res.map((it) => {
      const createdBRTZ = new Date(it.published);
      createdBRTZ.setHours(createdBRTZ.getHours() - 3);

      const updatedBRTZ = new Date(it.updated);
      updatedBRTZ.setHours(updatedBRTZ.getHours() - 3);

      return {
        id: it.id,
        published: createdBRTZ,
        updated: updatedBRTZ,
        title: it.title,
        content: it.content,
        user: it.userId,
      };
    });

    return resposta;
  }

  verificarUser(userId, post) {
    if (post.userId != userId) {
      throw new Unauthorized("usuário não autorizado");
    }
  }

  removendoDuplicatas(dados) {
    const res = [];
    const v = [];

    dados.forEach((dado) => {
      res.push(dado.dataValues);
    });

    for (let i = 0; i < res.length; i++) {
      if (v.length === 0) {
        v[i] = res[i];
      } else {
        let j = 0;
        v.forEach((it) => {
          if (it.id == res[i].id) {
            j++;
          }
        });
        if (j === 0) {
          v.push(res[i]);
        } else {
          j = 0;
        }
      }
    }

    return v;
  }

  validar() {
    if (!this.title) {
      throw new BadRequest("title é obrigatório");
    }
    if (!this.content) {
      throw new BadRequest("content é obrigatório");
    }
  }

  remover(userId) {
    this.verificarUser(userId, this);
    return TabelaPost.remover(this.id);
  }
}

module.exports = {
  Post: Post,
  async listarTodos() {
    const res = await TabelaPost.listar();
    for (let i = 0; i < res.length; i++) {
      const user = new User({ id: res[i].userId });
      await user.carregar();
      res[i].userId = user;
    }

    const resposta = res.map((it) => {
      const createdBRTZ = new Date(it.published);
      createdBRTZ.setHours(createdBRTZ.getHours() - 3);

      const updatedBRTZ = new Date(it.updated);
      updatedBRTZ.setHours(updatedBRTZ.getHours() - 3);

      return {
        id: it.id,
        published: createdBRTZ,
        updated: updatedBRTZ,
        title: it.title,
        content: it.content,
        user: it.userId,
      };
    });
    return resposta;
  },
};
