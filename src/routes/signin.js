'use strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../auth/basicAuth.js');
const UserModel = require('../middleware/schema.js');

router.post('/signin', basicAuth, async (req, res, next) => {


  const userFromDB = req.params.userFromDB;
  res.status(200).json(userFromDB);
});

module.exports = router;