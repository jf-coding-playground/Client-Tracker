const timesheetRepository = require('../../entities/timesheet/timesheet.repository');

module.exports = async function(client = '') {
  try {
    let timesheets;

    if (!client) {
      timesheets = await timesheetRepository.find();
    } 
    else {
      timesheets = await timesheetRepository.findByClient(client);
    }

    return timesheets;
  } 
  catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

