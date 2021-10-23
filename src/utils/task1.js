import readline from "readline";

const reverseString = (line) => {
  const reversedStr = line.trim().split("").reverse().join("");
  process.stdout.write(`${reversedStr}\n\n`);
};

const handleError = (err) => console.error(err)

const handleClose = () => process.exit(0)

const task1 = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", reverseString);
  rl.on("error", handleError);
  rl.on("close", handleClose);
};

export default task1;
