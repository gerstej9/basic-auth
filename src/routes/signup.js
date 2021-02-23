'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../middleware/schema.js');
const router = express.Router();


router.post('/signup', async (req, res) => {
  if(!req.body.username){res.status(500).send('Need username')}
  else if(!req.body.password){res.status(500).send('Need password')}
  else{
  let username = req.body.username;
  let password = req.body.password;


  let encryptedPassword = await bcrypt.hash(password, 5);
  const newUser = new UserModel({ username: username, password: encryptedPassword });
  const document = await newUser.save();

  res.status(201).json(document);
  }
});

module.exports = router;