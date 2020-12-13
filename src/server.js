const app = require("./app");
const config = require("config");
const routes = require("./routes");
const { errorHandler } = require("./middlewares");

routes(app);

app.use(errorHandler());

app.listen(config.get("api.porta"), () =>
  console.log("A API está funcionando na porta 3000")
);
