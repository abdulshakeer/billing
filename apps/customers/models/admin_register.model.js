const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "admin_register", {
            admin_reg_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
                unique:true
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            confirmPassword: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            
             // registration_token is used to send the push notification from mobile side 
            registration_token: {
                type: Sequelize.STRING,
                allowNull: true,
            }
        },
         {
            timestamps: true,
            indexes: [{
                fields: ["admin_reg_id", "email", "phone_number"],
            },],
          }
        );
    };