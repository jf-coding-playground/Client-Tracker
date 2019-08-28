require('dotenv').config();

const db = require('./config/mongo');
const server = require('./config/express');

(async function() {
  await db.connect();

  const isPopulated = await db.isPopulated();

  if (!isPopulated) {
    await db.populate();
  }

  server.start();
})();

