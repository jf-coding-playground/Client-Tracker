/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => res.send('Hello world!'));
require('../features/timesheets/timesheets.route')(app);

module.exports = {
  start: () => app.listen(port, () => console.log(`Listening on port: ${port}`))
};