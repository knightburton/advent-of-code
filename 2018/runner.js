import program from 'commander';
import fs from 'fs';
import path from 'path';

program
  .arguments('<day>', 'The choosen day')
  .action(day => {
    if (day <= 0 || day > 25) {
      console.error('The day must between 1 and 25!');
      process.exit();
    }

    const DDay = day.padStart(2, '0');

    const puzzleSolver = require(`./day-${DDay}/index`);

    fs.readFile(path.resolve(__dirname, `./day-${DDay}/input.txt`), (err, puzzle) => {
      if (err) throw err;

      console.log(`Day ${DDay} puzzle first part solution: ${puzzleSolver.first(puzzle.toString())}`);
      console.log(`Day ${DDay} puzzle second part solution: ${puzzleSolver.second(puzzle.toString())}`);
    });
  })
  .parse(process.argv);

const NO_ARGS_SPECIFIED = program.args.length === 0;

if (NO_ARGS_SPECIFIED) {
  console.error('The day must be specified!\tUsage: runner [options] <day>');
  process.exit();
}
