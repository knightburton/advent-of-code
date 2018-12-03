import program from 'commander';
import fs from 'fs';
import path from 'path';

/**
 * CONSTANTS
 */
const allowedYears = [
  '2017',
  '2018'
];

/**
 * VALIDATIONS
 */
const validateYear = year => {
  if (!year || typeof year !== 'string') throw new Error('Option year is required');
  if (!allowedYears.includes(year)) throw new Error(`The year must be one of [${allowedYears.join(', ')}]`);
};

const validateDay = day => {
  if (!day || typeof day !== 'string') throw new Error('Option day is required');
  if (day <= 0 || day > 25) throw new Error('The day must between 1 and 25!');
};

const validator = options => {
  try {
    validateYear(options.year);
    validateDay(options.day);
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
}

/**
 * ACTIONS
 */
const actionHandler = (year, day) => {
  validator({ year, day });

  try {
    const finalDay = day.padStart(2, '0');
    const puzzleSolver = require(`./${year}/day-${finalDay}/index`);
    const puzzle = fs.readFileSync(path.resolve(__dirname, `./${year}/day-${finalDay}/input.txt`));

    if (puzzleSolver.first) console.log(`Day ${finalDay} puzzle first part solution: ${puzzleSolver.first(puzzle.toString())}`);
    if (puzzleSolver.second) console.log(`Day ${finalDay} puzzle second part solution: ${puzzleSolver.second(puzzle.toString())}`);
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

/**
 * PROGRAM
 */
program
  .version('2.0.0')
  .option('-y, --year <year>', 'specify the year')
  .option('-d, --day <day>', 'specify the day')
  .action(actionHandler)
  .parse(process.argv);
