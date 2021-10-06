const fs = require("fs");
const csv = require("csvtojson");

const task2 = () => {
  const inputFile = fs.createReadStream("./csv/nodejs-hw1-ex1.csv");
  const outputFile = fs.createWriteStream("./csvparsed.txt");

  csv()
    .fromStream(inputFile)
    .subscribe((row) => outputFile.write(`${JSON.stringify(row)}\n`))
    .on("error", (err) => console.log(err))
    .on("done", () => {
      console.log("Finished writing to file");
      outputFile.close();
      inputFile.close();
      process.exit(0);
    });
};

module.exports = task2();
