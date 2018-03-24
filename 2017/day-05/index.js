import assert from 'assert';

const first = input => {
  input = input.split('\n').filter(x => x !== '').map(x => +x);

  let index = 0;
  let steps = 0;

  while(index < input.length) {
    const move = input[index];
    input[index]++;
    index = index + move;
    steps++;
  }

  return steps;
};

const second = input => {
  input = input.split('\n').filter(x => x !== '').map(x => +x);

  let index = 0;
  let steps = 0;

  while(index < input.length) {
    const move = input[index];
    move >= 3 ? input[index]-- : input[index]++;
    index = index + move;
    steps++;
  }

  return steps;
};

assert.ok(first('0\n3\n0\n1\n-3\n') === 5);

assert.ok(second('0\n3\n0\n1\n-3\n') === 10);

export default {
  first,
  second
};
