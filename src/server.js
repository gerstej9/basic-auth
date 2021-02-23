
'use strict';

require('dotenv').config();

const express = require('express');

const app = express();

const signUp = require('./routes/signup.js');
const signIn = require('./routes/signin.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(signUp);
app.use(signIn);


function start(port){
    app.listen(port, () => console.log('App is running'));
};

module.exports = {
  app: app,
  start: start,
}