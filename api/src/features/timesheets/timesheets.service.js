const { timesheetRepository } = require('../../entities/timesheet');

exports.getTimesheets = async function (client = '') {
    let timesheets;

    if (!client) {
      timesheets = await timesheetRepository.find();
    }
    else {
      timesheets = await timesheetRepository.findByClient(client);
    }

    return timesheets;
};

exports.createTimesheet = async function (timesheet) {
    const timesheetSaved = await timesheetRepository.save(timesheet);

    if (!timesheetSaved) {
      throw new Error('Timesheet was not saved!');
    }

    return timesheetSaved;
};
