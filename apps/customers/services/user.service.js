const { userTable, adminRegistertable, adminLoginTable } = require("../../../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt")
require('dotenv').config();
const jwt = require('jsonwebtoken');

async function _getAllUsers(req) {
  const { limit, offset } = req.query;
  limit ? limit : 0;
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
    totalCount,
  };
}

async function _adminRegister(req) {
  try {
    let { first_name,last_name, email, phone_number, password, confirmPassword, registration_token } = req.body;
    let admin = await adminRegistertable.findOne( { where : { email:email }} )
    if(admin){
      throw new Error('User Already Exist!')
    }

    if (!email || !password) {
      throw new Error('Missing email or password');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    
    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = {
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
      registration_token
    };

    const result = await adminRegistertable.create(newAdmin); 
    const loginTable = new adminLoginTable()
    loginTable.email = email;
    loginTable.password = hashedPassword;
    loginTable.admin_reg_id = result.admin_reg_id;
    await loginTable.save()
    delete result.password; 
    return await {
      user: result
    };
  } catch (error) {
    throw new Error('Error',error)
  }
 
}


async function _adminLogin(req) {
  try {
    let {  email, password } = req.body;
    let admin = await adminLoginTable.findOne( { where : { email:email }} )
    if(!admin){
      throw new Error('User Not Found!')
    }

    if (!email || !password) {
      throw new Error('Missing email or password');
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ admin_id: admin.admin_login_id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE });
    admin.token = token;
    await admin.save()
    delete admin.password;
    return {
      result: admin
    };    
  } catch (error) {
    throw new Error('Error',error)
  }
 
}

module.exports = {
  _getAllUsers,
  _adminRegister,
  _adminLogin
};
