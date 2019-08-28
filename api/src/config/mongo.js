/* eslint-disable no-console */
const Mongoose = require('mongoose');
const { csvToJSON, createCollection } = require('../utils/helpers');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// MODELS
const { timesheetModel } = require('../entities/timesheet');

// DATA
const timesheetData = csvToJSON('data/example_data.csv');

module.exports = {
  connect: async () => {
    try {
      await Mongoose.connect(url, options);
      console.log('MongoDB is connected');
    }
    catch (error) {
      console.log(`An error occurred while connecting to db, Error: ${error.message}`);
    }
  },
  populate: async () => {
    try {
      await createCollection(timesheetData, timesheetModel);
    } 
    catch (error) {
      console.log(`Error occurred when populating database, Error: ${error.message}`);
    }
  },
  isPopulated: async () => {
    const timesheetCollection = await Mongoose.connection.db
      .listCollections({ name: timesheetModel.collection.name })
      .toArray();

    return timesheetCollection.length !== 0;
  }
};