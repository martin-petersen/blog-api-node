const errorHandler = require("./error-handler");
const local = require("./middleware-auth");
const bearer = require("./middleware-token");

module.exports = {
  errorHandler,
  local,
  bearer,
};
