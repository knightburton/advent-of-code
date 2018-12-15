import assert from 'assert';

const parseInput = input => +input.trim();

const getArray = length => Array.from({ length }, (_, key) => key);

const getGrid = (array, serial) => array.map(y => array.map(x => Math.floor(((((x + 11) * (y + 1)) + serial) * (x + 11) / 100) % 10) - 5));

const getSquares = (length, grid, { from = 3, to = 3} = {}) => {
  let squares = [];

  for (let limit = from; limit <= to; limit++) {
    for (let y = 0; y < length - limit; y++) {
      for (let x = 0; x < length - limit; x++) {
        squares.push({ x: x + 1, y: y + 1, squareLevel: getSquareLevel(grid, { x, y }, limit), limit });
      }
    }
  }
  return squares;
};

const getSquareLevel = (grid, coordinate, limit) => {
  let powerLevel = 0;

  for (let y = coordinate.y; y <= coordinate.y + limit - 1; y++) {
    for (let x = coordinate.x; x <= coordinate.x + limit - 1; x++) {
      powerLevel += grid[y][x];
    }
  }

  return powerLevel;
};

export const first = input => {
  const array = getArray(300);
  const serialNumber = parseInput(input);
  const grid = getGrid(array, serialNumber);
  const squares = getSquares(300, grid, 1);
  const largestSquare = squares.sort((a, b) => b.squareLevel - a.squareLevel)[0];

  return `${largestSquare.x},${largestSquare.y}`;
};

export const second = input => {
  const array = getArray(300);
  const serialNumber = parseInput(input);
  const grid = getGrid(array, serialNumber);
  const squares = getSquares(300, grid, { from: 1, to: 300 });
  const largestSquare = squares.sort((a, b) => b.squareLevel - a.squareLevel)[0];

  return `${largestSquare.x},${largestSquare.y},${largestSquare.limit}`;
};

assert.ok(first('42') === '21,61');
assert.ok(first('18') === '33,45');

assert.ok(second('42') === '232,251,12');
assert.ok(second('18') === '90,269,16');
