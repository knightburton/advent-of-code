import assert from 'assert';

export const first = input => input.split('\n').filter(_ => _).map(i => parseInt(i)).reduce((acc, i) => acc + i, 0);

export const second = input => {
  const set = new Set();
  const parsedInput = input.split('\n').filter(_ => _).map(i => parseInt(i));
  set.add('0', 0);

  let result = 0;
  while(true) {
    for(const i of parsedInput) {
      result = result + i;
      if (set.has(`${result}`)) return result;
      set.add(`${result}`, result);
    }
  }
};

assert.ok(first('+1\n+1\n+1\n') === 3);
assert.ok(first('+1\n+1\n-2\n') === 0);
assert.ok(first('-1\n-2\n-3\n') === -6);

assert.ok(second('+1\n-1\n') === 0);
assert.ok(second('+3\n+3\n+4\n-2\n-4\n') === 10);
assert.ok(second('-6\n+3\n+8\n+5\n-6\n') === 5);
assert.ok(second('+7\n+7\n-2\n-7\n-4\n') === 14);
