class BadRequest extends Error {
  constructor(mensagem) {
    super(mensagem);
  }
}

module.exports = BadRequest;
