const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const task1 = () => {
  rl.on("line", (line) => {
    const reversedStr = line.trim().split("").reverse().join("");
    process.stdout.write(`${reversedStr}\n\n`);
  }).on("close", () => {
    process.exit(0);
  });
};


module.exports = task1;
