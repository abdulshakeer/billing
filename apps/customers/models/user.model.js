const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "user", {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            salution: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            middleName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            gender: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            dob: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: true
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
                fields: ["user_id", "email", "phone_number"],
            },],
          }
        );
    };