const { userTable } = require("../../../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function _getAllUsers(req) {
    const {  limit, offset } = req.query;
    limit ? limit : 0
    var results = await userTable.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });
  
    let totalCount = await userTable.count({
      order: [["createdAt", "DESC"]],
    });

    let pages = Math.ceil(totalCount / limit);
    return await {
      user: results,
      count: results.length,
      pages,
      totalCount
    };
  }

  module.exports = {
    _getAllUsers
  }