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
  
  
    const validUser = await UserModel.authenticate(username, password);
  
    if (validUser) {
      req.params.userFromDB = validUser;
      next();
    } else {
      next('Invalid User Sign In');
    }
  }catch(e){
    next('Invalid User Sign In');
  }
}

module.exports = basicAuth;
