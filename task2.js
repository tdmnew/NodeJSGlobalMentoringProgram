const { pipeline } = require("stream");
const fs = require("fs");
const csv = require("csvtojson");

const task2 = () => {
  const inputFile = fs.createReadStream("./csv/nodejs-hw1-ex1.csv");
  const outputFile = fs.createWriteStream("./csvparsed.txt");

  pipeline(inputFile, csv(), outputFile, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File written successfully");
      process.exit(0)
    }
  });
};

module.exports = task2;
