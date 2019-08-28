const mongoose = require('mongoose');
const timesheetModel = mongoose.model('Timesheet');

exports.save = async function(timesheet) {
  const newTimesheet = new timesheetModel(timesheet);
  await newTimesheet.save();

  return newTimesheet;
};

exports.findByClient = async function(client) {
  return await timesheetModel.find({ 'Client': client });
};

exports.find = async function() {
  return await timesheetModel.find({}).exec();
};