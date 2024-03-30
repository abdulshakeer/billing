const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");
const appRoutes = require("./apps/index");
const errorHandler = require("./helpers/error_handler");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.options("*", cors());

app.use('/api', appRoutes);

app.get('/',(req,res)=>{
  res.status(200).send("Hello From the Server")
})

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;