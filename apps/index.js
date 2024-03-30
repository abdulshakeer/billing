var express = require("express");
var app = express();

const UsersRoutes = require("./customers/controllers/user.controller");
const ClientRoutes = require("./customers/controllers/client.controller");

app.use("/users", UsersRoutes);
app.use("/client", ClientRoutes);


module.exports = app;