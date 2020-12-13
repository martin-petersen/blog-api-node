const { BadRequest, NotFound, Unauthorized } = require("../error");

function errorHandler() {
  return (err, req, res, next) => {
    let status = 500;
    if (err instanceof BadRequest) {
      status = 400;
    } else if (err instanceof NotFound) {
      status = 404;
    } else if (err instanceof Unauthorized) {
      status = 401;
    }
    res.status(status);
    res.send({
      mensagem: err.message,
    });
  };
}

module.exports = errorHandler;
