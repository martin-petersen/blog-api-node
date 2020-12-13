const express = require("express");
const app = express();
const { urlencoded, json } = require("body-parser");
const { auth } = require("./security");

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());

module.exports = app;
