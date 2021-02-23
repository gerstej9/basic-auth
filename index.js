'use strict';

require('dotenv').config()

const server = require('./src/server.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT;


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  server.start(PORT);
});