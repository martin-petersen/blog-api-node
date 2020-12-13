class Unauthorized extends Error {
  constructor(mensagem) {
    super(mensagem);
  }
}

module.exports = Unauthorized;
