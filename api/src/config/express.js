/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const clientPath = '../../../client/build';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
require('../features/timesheets/timesheets.route')(app);

if (process.env.NODE_ENV === 'production') {
  console.log('running in production!');
  app.use(express.static(path.join(__dirname, clientPath)));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, clientPath, 'index.html'));
  });
}

module.exports = {
  start: () => app.listen(port, () => console.log(`Listening on port: ${port}`))
};