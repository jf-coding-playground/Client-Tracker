const mongoose = require('mongoose');
const timesheetModel = mongoose.model('Timesheet');

async function save(timesheet) {
  const newTimesheet = new timesheetModel(timesheet);
  await newTimesheet.save();

  return newTimesheet;
}

async function findByClient(client) {
  return await timesheetModel.find({ client });
}

async function find() {
  return await timesheetModel.find({}).exec();
}

module.exports = {
  save, 
  findByClient,
  find
};