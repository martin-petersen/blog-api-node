const userController = require("./user-controller");
const { local, bearer } = require("../middlewares/");
const passport = require("passport");

module.exports = (app) => {
  app.route("/login").post(local, userController.login);

  app
    .route("/user")
    .post(userController.cadastrar)
    .get(bearer, userController.listarUsers);

  app.route("/user/me").delete(bearer, userController.deletarUser);

  app
    .route("/user/:id")
    .delete(bearer, userController.deletarUser)
    .get(bearer, userController.buscarUm);
};
