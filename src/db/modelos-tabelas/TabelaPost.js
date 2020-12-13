const Sequelize = require("sequelize");
const instancia = require("../index");

const colunas = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require("./TabelaUser"),
      key: "id",
    },
  },
};

const opcoes = {
  freezeTableName: true,
  tableName: "posts",
  timestamps: true,
  createdAt: "published",
  updatedAt: "updated",
};

module.exports = instancia.define("posts", colunas, opcoes);
