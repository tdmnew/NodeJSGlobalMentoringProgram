import task1 from "./task1";
import task2 from "./task2";

const arg = process.argv.splice(2);

switch (arg[0]) {
  case "--task1":
    task1();
    break;
  case "--task2":
    task2();
    break;
  default:
    console.log("No valid argument given - closing");
    process.exit(0);
}
