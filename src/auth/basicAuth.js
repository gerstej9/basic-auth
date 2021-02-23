'use strict';

const UserModel = require('../middleware/schema.js');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

async function basicAuth(req, res, next){
  try{
    let basicHeader = req.headers.authorization.split(' '); 
    let encodedString = basicHeader[1];
    let decodedString = base64.decode(encodedString); 
    let [username, password] = decodedString.split(':');
  
  

    let userFromDB = await UserModel.findOne({ username: username });
    let isValid = await bcrypt.compare(password, userFromDB.password);
  
    if (isValid) {
      req.params.userFromDB = userFromDB;
      next();
    } else {
      next('Invalid User Sign In');
    }
  }catch(e){
    next('Invalid User Sign In');
  }
}

module.exports = basicAuth;
