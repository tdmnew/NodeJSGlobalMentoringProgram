<<<<<<< HEAD:task2.js
const { pipeline } = require("stream");
const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");
=======
import { pipeline } from 'stream';
import fs from 'fs';
import csv from 'csvtojson';
>>>>>>> 8bd785a (Added babel, src and dist folders):src/task2.js

const csvFilePath = path.join(__dirname, "./csv/nodejs-hw1-ex1.csv");
const outputFilePath = path.join(__dirname, "./csvparsed.txt");

const handleStreamFinish = (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File written successfully");
    process.exit(0);
  }
};

const task2 = () => {
  const inputFile = fs.createReadStream(csvFilePath);
  const outputFile = fs.createWriteStream(outputFilePath);

  pipeline(inputFile, csv(), outputFile, handleStreamFinish);
};

export default task2;
