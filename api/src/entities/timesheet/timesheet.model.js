const mongoose = require('mongoose');

//TODO: import csv file using mongoose model

const timesheet = mongoose.model('Timesheet', new mongoose.Schema({
  'Date': Date,
  'Client': String,
  'Project': String,
  'Project Code': String,
  'Task': String,
  'Hours': Number,
  'Hours Rounded': Number,
  'Billable?': String,
  'Invoiced?': String,
  'Approved?': String,
  'First Name': String,
  'Last Name': String,
  'Department': String,
  'Employee?': String,
  'Billable Rate': Number,
  'Cost Rate': Number,
  'Cost Amount': Number,
  'Currency': String,
  'External Reference URL': String
}));

module.exports = timesheet;