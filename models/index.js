const { Sequelize } = require("sequelize");
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DATABASE, DB_PORT } = process.env;

// Create Sequelize instance
const sequelize = new Sequelize(POSTGRES_DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: "postgres",
  port: DB_PORT || 5432, // Default PostgreSQL port is 5432
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false } // Enable SSL for secure connections
  },
});

const userTable = require("../apps/customers/models/user.model")(sequelize, Sequelize);

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
    userTable
}