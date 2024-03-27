const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");
const appRoutes = require("./apps/index");

app.use('/api', appRoutes);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.options("*", cors());

app.get('/',(req,res)=>{
  res.status(200).send("Hello From the Server")
})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;