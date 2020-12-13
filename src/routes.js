const users = require("./users");
const posts = require("./posts");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("Olá pessoa!");
  });

  users.rotas(app);
  posts.rotas(app);
};
