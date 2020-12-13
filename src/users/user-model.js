const TabelaUser = require("./user-dao");
const BadRequest = require("../error/BadRequest");
const bcrypt = require("bcrypt");

class User {
  constructor({
    id,
    displayName,
    email,
    password,
    image,
    createdAt,
    updatedAt,
    version,
  }) {
    this.id = id;
    this.displayName = displayName;
    this.email = email;
    this.password = password;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  async criar() {
    this.validar();
    const senha = this.password;
    this.password = await this.gerarHash(senha);
    try {
      const resultado = await TabelaUser.inserir({
        displayName: this.displayName,
        email: this.email,
        password: this.password,
        image: this.image,
      });

      this.id = resultado.id;
      this.createdAt = resultado.createdAt;
      this.updatedAt = resultado.updatedAt;
      this.version = resultado.version;
    } catch (err) {
      throw new BadRequest("email já em uso");
    }
  }

  async buscarEmail() {
    const resultado = await TabelaUser.buscarEmail(this.email);
    this.id = resultado.id;
    this.displayName = resultado.displayName;
    this.password = resultado.password;
    this.image = resultado.image;
    this.createdAt = resultado.createdAt;
    this.updatedAt = resultado.updatedAt;
    this.version = resultado.version;
  }

  async carregar() {
    const resultado = await TabelaUser.buscarID(this.id);
    this.email = resultado.email;
    this.displayName = resultado.displayName;
    this.password = resultado.password;
    this.image = resultado.image;
    this.createdAt = resultado.createdAt;
    this.updatedAt = resultado.updatedAt;
    this.version = resultado.version;
  }

  remover() {
    return TabelaUser.remover(this.id);
  }

  async gerarHash(senha) {
    const custo = 12;
    const hash = await bcrypt.hash(this.password, custo);
    return hash;
  }

  validar() {
    if (this.displayName.length < 8) {
      throw new BadRequest("displayName deve ter pelo menos 8 caracteres");
    }
    if (!this.email) {
      throw new BadRequest("email é obrigatório");
    }
    if (
      this.email.indexOf("@") === -1 ||
      this.email.indexOf("@") === 0 ||
      this.email.indexOf("@") === this.email.length - 1
    ) {
      throw new BadRequest("email inválido");
    }
    if (!this.password) {
      throw new BadRequest("password é obrigatório");
    }
    if (this.password.length < 6) {
      throw new BadRequest("password deve ter pelo menos 6 caracteres");
    }
  }
}

module.exports = User;
