import assert from 'assert';

const first = input => {
  input = input.split('\t').map(x => +x);

  const set = new Set();
  const size = input.length;
  let steps = 0;

  set.add(input.join());
  do {
    steps++;

    const index = input.indexOf(Math.max(...input));
    const max = input[index];
    input[index] = 0;
    for (let i = 1; i <= max; i++) {
      input[(index + i) % input.length]++;
    }

    if (set.has(input.join())) return steps;
    set.add(input.join());
  } while(true);
};

const second = input => {
  input = input.split('\t').map(x => +x);

  const set = [];
  const size = input.length;
  let steps = 0;

  set.push({
    data: input.join(),
    step: steps
  });

  do {
    steps++;

    const index = input.indexOf(Math.max(...input));
    const max = input[index];
    input[index] = 0;
    for (let i = 1; i <= max; i++) {
      input[(index + i) % input.length]++;
    }

    const found = set.find(s => s.data === input.join());
    if (found) return steps - found.step;

    set.push({
      data: input.join(),
      step: steps
    });
  } while(true);
};

assert.ok(first('0\t2\t7\t0') === 5);

assert.ok(second('0\t2\t7\t0') === 4);

export default {
  first,
  second
};
