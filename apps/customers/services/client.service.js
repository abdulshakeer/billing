const { userTable, adminRegistertable, adminLoginTable, clientTable } = require("../../../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt")
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { generateRandomPassword } = require('../../../helpers/password_helper');

async function _clientRegister(req) {
    try {
        const { client_name, client_password, client_phone_number, client_email, business_name, address } = req.body;
        const random_password = generateRandomPassword();
        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(random_password, salt);

        let newClient = await clientTable.create({
            client_name,
            client_password:hashedPassword,
            client_phone_number,
            client_email,
            business_name,
            address,
        });
        newClient.client_password = random_password;
        return await {
            rseult:newClient
        }

       } catch (error) {
        throw ('Error',error)
       }
   
  }

  async function _getAllClients(req) {
    const { limit, offset } = req.query;
    let whereCondition = { is_deleted: false }
    limit ? limit : 0;
    var results = await clientTable.findAll({
      limit: limit,
      offset: offset,
      where:whereCondition,
      order: [["createdAt", "DESC"]],
    });
  
    let totalCount = await clientTable.count({
      order: [["createdAt", "DESC"]],
    });
  
    let pages = Math.ceil(totalCount / limit);
    return await {
      user: results,
      count: results.length,
      pages,
      totalCount,
    };
  }

async function _getClientById(req){
    return await clientTable.findOne({
        where:{is_deleted:false,client_id:req.params.id}
    })
}

async function _clientUpdate(req){
    const { client_name, client_phone_number, client_email, business_name, address } = req.body;
    let client = await clientTable.findOne({ where :{ is_deleted : false , client_id:req.params.id }})
    if(!client){
        throw ('Client Not Found!')
    }
    const random_password = generateRandomPassword();
    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(random_password, salt);
    let result = await clientTable.update({
        client_name,
        client_password:hashedPassword,
        client_phone_number,
        client_email,
        business_name,
        address,
    },{ where :{ client_id : req.params.id }})
    result.client_password = hashedPassword;
    return {
        data:result
    }
}

async function _clientDelete(req){
    let client = await clientTable.findOne( { where :{ is_deleted :false, client_id:req.params.id} } )
    if(!client){
        throw ('Client Not Found')
    }
    client.is_deleted = true;
    return await client.save()    
}

module.exports = {
    _clientRegister,
    _getAllClients,
    _getClientById,
    _clientUpdate,
    _clientDelete
}