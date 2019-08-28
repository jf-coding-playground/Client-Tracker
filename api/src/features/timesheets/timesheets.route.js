const timesheetsController = require('./timesheets.controller');

module.exports = function(app) {
  app.get('/api/v1/timesheets', timesheetsController);
  app.get('/api/v1/timesheets/:client', timesheetsController);
};