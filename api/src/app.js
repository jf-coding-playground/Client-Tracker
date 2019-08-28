require('dotenv').config();

const db = require('./config/mongo');
const server = require('./config/express');

db.connect();
server.start();