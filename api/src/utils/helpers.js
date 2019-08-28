const path = require('path');
const fs = require('fs');
const csvjson = require('csvjson');

exports.csvToJSON = (csvPath) => {
  try {
    let file = fs.readFileSync(path.join(`${__dirname}/../`, csvPath), { encoding: 'utf8' });
    let options = {
      delimiter: ',',
      quote: '"'
    };

    return csvjson.toObject(file, options);
  } 
  catch (error) {
    console.log(`Error occurred while converting csv to JSON, Error: ${error.message}`);
  }
};

exports.createCollection = async (entries, model) => {
  try {
    const { collectionName } = model.collection;
    console.log(`Creating collection: ${ collectionName }`);

    await entries.forEach(entry => model.create(entry));
  }
  catch (error) {
    console.log(`Error occurred while creating collection, Error: ${error.message}`);
  }
};