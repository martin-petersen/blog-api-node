class Conflict extends Error {
  constructor(mensagem) {
    super(mensagem);
  }
}

module.exports = Conflict;
