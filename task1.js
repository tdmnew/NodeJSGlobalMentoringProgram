const readline = require("readline");

const task1 = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    prompt: "Enter a string: ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    const reversedStr = line.split("").reverse().join("");
    process.stdout.write(`${reversedStr}\n`);
    rl.prompt();
  }).on("close", () => {
    process.exit(0);
  });
};

module.exports = task1;
