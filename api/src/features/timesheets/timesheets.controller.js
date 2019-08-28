const timesheetsService = require('./timesheets.service');

module.exports = async function(req, res) {
  try {
    const client = req.params.client;
    const timesheets = await (client ? timesheetsService(client) : timesheetsService());

    if (timesheets) {
      res.status(200).send(timesheets);
    }
    else {
      res.status(400).send({ message: 'timesheets do not exist!' });
    }
  } 
  catch (error) {
    res.status(500).send(`Error occurred: ${error.message}`);
  }
};