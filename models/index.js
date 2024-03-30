const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
//
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: DB_PORT,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    },
  }
});

const adminRegistertable = require('../apps/customers/models/admin_register.model')(sequelize,Sequelize)
const adminLoginTable = require('../apps/customers/models/admin_login.model')(sequelize,Sequelize)
const clientTable = require('../apps/customers/models/client.model')(sequelize,Sequelize)

sequelize
  .authenticate()
  .then(() => console.log("db is connected"))
  .catch((err) => console.log("error" + err));

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });


module.exports = {
    adminRegistertable,
    adminLoginTable,
    clientTable
}