const { getTimesheets, createTimesheet } = require('./timesheets.service');

exports.getTimesheetsController = async function (req, res) {
  try {
    const client = req.params.client;
    const timesheets = await (client ? getTimesheets(client) : getTimesheets());

    if (timesheets) {
      res.status(200).send(timesheets);
    }
    else {
      res.status(400).send({ message: 'timesheets do not exist!' });
    }
  }
  catch (error) {
    res.status(500).send({ 
      message: 'Timesheets could not be found',
      error: error.message
    });
  }
};

exports.postTimesheetController = async function (req, res) {
  try {
    const timesheet = req.body;
    
    const savedTimesheet = await createTimesheet(timesheet);

    res.status(200).send({ 
      message: 'Timesheet created!',
      data: savedTimesheet
    });
  } 
  catch (error) {
    res.status(500).send({ 
      message: 'Timesheet was not created',
      error: error.message
    });
  }
};