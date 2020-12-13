const User = require("../users/user-model");

class Serializador {
  serializarLista(dados) {
    return JSON.stringify(this.serializadorListaDTO(dados));
  }

  serializarObjeto(dados) {
    return JSON.stringify(this.serializadorObjetoDTO(dados));
  }

  serializadorListaDTO(dados) {
    return dados.map((it) => {
      const v = {};

      this.camposPublicos.forEach((prop) => {
        if (prop === "user") {
          const user = new User(it[prop]);
          v["user"] = this.serializadorUserDTO(user);
        } else {
          v[prop] = it[prop];
        }
      });

      return v;
    });
  }

  serializadorUserDTO(dados) {
    const dto = {};
    const camposPublicos = ["id", "displayName", "email", "image"];
    camposPublicos.forEach((prop) => {
      dto[prop] = dados[prop];
    });
    return dto;
  }

  serializadorObjetoDTO(dados) {
    const dto = {};
    this.camposPublicos.forEach((prop) => {
      if (prop === "user") {
        const user = new User(dados[prop]);
        dto["user"] = this.serializadorUserDTO(user);
      } else {
        dto[prop] = dados[prop];
      }
    });
    return dto;
  }

  serializarNovoPost(dados) {
    const dto = {};

    this.camposNovoPost.forEach((prop) => {
      dto[prop] = dados[prop];
    });
    return dto;
  }
}

class SerializadorUser extends Serializador {
  constructor() {
    super();
    this.camposPublicos = ["id", "displayName", "email", "image"];
  }
}

class SerializadorPost extends Serializador {
  constructor() {
    super();
    this.camposPublicos = [
      "id",
      "published",
      "updated",
      "title",
      "content",
      "user",
    ];
    this.camposNovoPost = ["title", "content", "userId"];
  }
}

module.exports = {
  Serializador: Serializador,
  SerializadorUser: SerializadorUser,
  SerializadorPost: SerializadorPost,
};
