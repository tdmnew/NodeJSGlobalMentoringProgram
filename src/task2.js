import { pipeline } from "stream";
import path from "path";
import fs from "fs";
import csv from "csvtojson";

const csvFilePath = path.join(__dirname, "../csv/nodejs-hw1-ex1.csv");
const outputFilePath = path.join(__dirname, "../csvparsed.txt");

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
