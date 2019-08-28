const { getTimesheetsController, postTimesheetController } = require('./timesheets.controller');

module.exports = function(app) {
  app.get('/api/v1/timesheets', getTimesheetsController);
  app.get('/api/v1/timesheets/:client', getTimesheetsController);
  app.post('/api/v1/timesheet', postTimesheetController);
};