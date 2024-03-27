const Sequelize = require("sequelize");
const { adminRegistertable } = require("../../../models");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "admin_login", {
            admin_login_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            admin_reg_id: {
                type: Sequelize.INTEGER,
                references: adminRegistertable,
                referencesKey: "admin_reg_id",
            }
        },
         {
            timestamps: true,
            indexes: [{
                fields: ["admin_login_id"],
            },],
          }
        );
    };