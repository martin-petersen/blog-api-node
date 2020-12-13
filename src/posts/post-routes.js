const postController = require("./post-controller");
const { bearer } = require("../middlewares");

module.exports = (app) => {
  app
    .route("/post")
    .post(bearer, postController.cadastrarPost)
    .get(bearer, postController.listarPosts);

  app.route("/post/search").get(bearer, postController.buscarConteudo);

  app
    .route("/post/:id")
    .get(bearer, postController.listarUm)
    .put(bearer, postController.atualizarPost)
    .delete(bearer, postController.deletarPost);
};
