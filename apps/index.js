var express = require("express");
var app = express();

const UsersRoutes = require("./customers/controllers/user.controller");

app.use("/users", UsersRoutes);


module.exports = app;