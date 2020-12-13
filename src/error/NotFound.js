class NotFound extends Error {
  constructor(mensagem) {
    super(mensagem);
  }
}

module.exports = NotFound;
