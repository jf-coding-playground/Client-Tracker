/* eslint-disable no-console */
const Mongoose = require('mongoose');
const { csvToJSON, createCollection } = require('../utils/helpers');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  MONGO_PROD_USERNAME,
  MONGO_PROD_PASSWORD
} = process.env;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};

let url = process.env.NODE_ENV === 'production' ? 
`mongodb+srv://${MONGO_PROD_USERNAME}:${MONGO_PROD_PASSWORD}@cluster0-udmbr.mongodb.net/test?retryWrites=true&w=majority` :
`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// const productionURL = `mongodb+srv://${MONGOPROD_USERNAME_}:${MONGO_PROD_PASSWORD}@cluster0-udmbr.mongodb.net/test?retryWrites=true&w=majority`

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