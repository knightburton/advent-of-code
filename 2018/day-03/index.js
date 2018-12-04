import assert from 'assert';

const pattern = /^#(\d*)\s@\s(\d*),(\d*):\s(\d*)x(\d*)$/;

const generateInstructions = input => input.split('\n').filter(l => l).map(line => pattern.exec(line)).map(parts => ({
  id: +parts[1],
  left: +parts[2],
  top: +parts[3],
  width: +parts[4],
  height: +parts[5]
}));

const generateFabric = instructions => {
  let fabric = [];

  instructions.forEach(instruction => {
    [...Array(instruction.left + instruction.width).keys()].forEach(i => {
      if (!fabric[i]) fabric[i] = [...Array(instruction.top + instruction.height).keys()].map(() => 0);
      [...Array(instruction.top + instruction.height).keys()].forEach(j => {
        if (!fabric[i][j]) fabric[i][j] = 0;
        if (i >= instruction.left && j >= instruction.top) fabric[i][j] += 1;
      });
    });
  });

  return fabric;
};

export const first = input => generateFabric(generateInstructions(input)).reduce((a, b) => [...a, ...b]).filter(f => f >= 2).length;

export const second = input => {
  const instructions = generateInstructions(input);
  const fabric = generateFabric(instructions);

  const singles = instructions.filter(ins => {
    let single = [];

    [...Array(ins.width).keys()].forEach(i => {
      [...Array(ins.height).keys()].forEach(j => {
        single.push(fabric[i + ins.left][j + ins.top]);
      });
    });

    return single.every(x => x === 1);
  });

  return singles.length === 1 ? singles.pop().id : 0;
};

assert.ok(first('#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2\n') === 4);

assert.ok(second('#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2\n') === 3);

