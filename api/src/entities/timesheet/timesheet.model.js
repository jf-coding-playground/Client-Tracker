const mongoose = require('mongoose');

module.exports = mongoose.model('Timesheet', new mongoose.Schema({
  'Date': { type: Date, required: true },
  'Client': { type: String, required: true },
  'Project': { type: String, required: true },
  'Project Code': { type: String, required: true },
  'Task': { type: String, required: true },
  'Hours': { type: Number, required: true },
  'Hours Rounded': { type: Number, required: true },
  'Billable?': { type: String, required: true },
  'Invoiced?': { type: String, required: true },
  'Approved?': { type: String, required: true },
  'First Name': { type: String, required: true },
  'Last Name': { type: String, required: true },
  'Department': { type: String, required: false },
  'Employee?': { type: String, required: true },
  'Billable Rate': { type: Number, required: true },
  'Cost Rate': { type: Number, required: true },
  'Cost Amount': { type: Number, required: true },
  'Currency': { type: String, required: true },
  'External Reference URL': { type: Number, required: false }
}));