'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
});

userSchema.pre('save', async function () {
  if(this.isModified(this.password)){
    this.password = await bcrypt.hash(this.password, 5);
  }
});

userSchema.statics.authenticate = async function (username, password) {
  let userFromDB = await this.findOne({ username: username });
  let isValid = await bcrypt.compare(password, userFromDB.password);
  if(isValid){
    return userFromDB;
  }else{
    throw new Error('Validation Error');
  }
}

const UserModel = mongoose.model('api_user', userSchema);

module.exports = UserModel;