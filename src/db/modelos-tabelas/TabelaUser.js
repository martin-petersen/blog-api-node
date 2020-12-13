const Sequelize = require("sequelize");
const instancia = require("../index");

const colunas = {
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};

const opcoes = {
  freezeTableName: true,
  tableName: "users",
  timestamps: true,
};

module.exports = instancia.define("users", colunas, opcoes);
