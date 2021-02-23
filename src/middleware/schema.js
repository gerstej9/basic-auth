'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
});

userSchema.pre('save', async function () {
});

userSchema.statics.example = async function () {
}

const UserModel = mongoose.model('api_user', userSchema);

module.exports = UserModel;