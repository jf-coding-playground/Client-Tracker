require('dotenv').config();

const server = require('./config/express');
const db = require('./config/mongo');

db.connect();
server.start();