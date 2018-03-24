import assert from 'assert';

const first = input => {
  let sum = 0;
  let last = +input[0];

  input = input + input[0];
  input.split('').forEach((current, index) => {
    if (index === 0) return;
    if (last === +current) sum += +current;
    last = +current;
  });

  return sum;
};

const second = input => {
  return input.substr(input.length / 2).split('').reduce((sum, current, index) => {
    if (input[index] === current) sum += 2 * current;
    return sum;
  }, 0);
};

assert.ok(first('1122') === 3);
assert.ok(first('1111') === 4);
assert.ok(first('1234') === 0);
assert.ok(first('91212129') === 9);

assert.ok(second('1212') === 6);
assert.ok(second('1221') === 0);
assert.ok(second('123425') === 4);
assert.ok(second('123123') === 12);
assert.ok(second('12131415') === 4);

export default {
  first,
  second
};
