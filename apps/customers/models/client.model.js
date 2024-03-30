const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "client", {
            client_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            client_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            client_password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            client_phone_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            client_email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            business_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
           
        },
         {
            timestamps: true,
            indexes: [{
                fields: ["client_id", "client_email", "client_phone_number"],
            },],
          }
        );
    };