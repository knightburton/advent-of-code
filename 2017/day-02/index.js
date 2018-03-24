import assert from 'assert';

const first = input => {
  input = input.split('\n').map(row => row.split('\t'));

  return input.map(row => Math.max(...row) - Math.min(...row)).reduce((acc, current) => acc + current);
};

const second = input => {
  input = input.split('\n').map(row => row.split('\t'));

  return input.map(row => {
    return row.map((i, ii) => {
      return row.map((j, jj) => {
        const divide = +i / +j;
        if (divide !== 1 && divide % 1 === 0) return divide;
      }).filter(x => x !== undefined);
    }).filter(x => x.length !== 0);
  }).reduce((acc, current) => +acc + +current, 0);
};

assert.ok(first('5\t1\t9\t5\n7\t5\t3\n2\t4\t6\t8') === 18);

assert.ok(second('5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5') === 9);

export default {
  first,
  second
};
