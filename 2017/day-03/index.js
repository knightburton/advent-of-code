import assert from 'assert';

const first = input => {
  input = +input;
  if (input === 1) return 0;

  const root = Math.ceil(Math.sqrt(input));
  const size = root & 1 ? root: root + 1;
  const mid = ((size + 1) / 2) % (size - 1);
  const mod = input % (size - 1);
  const dist = Math.min(Math.abs(mod - mid), Math.abs(mid - mod - size + 1));

  return dist + (size - 1) / 2;
};

const second = input => {
  let x = 0;
  let y = 0;
  let dir = 'R';
  let data = [];

  for (let i = 1; ; i++) {
    let value = 0;

    if (data[y] && data[y][x + 1]) value += data[y][x + 1];
    if (data[y] && data[y][x - 1]) value += data[y][x - 1];
    if (data[y + 1] && data[y + 1][x]) value += data[y + 1][x];
    if (data[y + 1] && data[y + 1][x + 1]) value += data[y + 1][x + 1];
    if (data[y + 1] && data[y + 1][x - 1]) value += data[y + 1][x - 1];
    if (data[y - 1] && data[y - 1][x]) value += data[y - 1][x];
    if (data[y - 1] && data[y - 1][x + 1]) value += data[y - 1][x + 1];
    if (data[y - 1] && data[y - 1][x - 1]) value += data[y - 1][x - 1];
    if (i === 1) value = 1;

    data[y] = data[y] || {};
    data[y][x] = value;

    if (value > input) {
      return value;
    }

    if (i > 1) {
      if (dir === 'R' && (!data[y - 1] || !data[y - 1][x])) dir = 'U';
      else if (dir === 'U' && !data[y][x - 1]) dir = 'L';
      else if (dir === 'L' && (!data[y + 1] || !data[y + 1][x])) dir = 'D';
      else if (dir === 'D' && !data[y][x + 1]) dir = 'R';
    }

    if (dir === 'L') x--;
    if (dir === 'R') x++;
    if (dir === 'U') y--;
    if (dir === 'D') y++;
  }
};

assert.ok(first('1') === 0);
assert.ok(first('12') === 3);
assert.ok(first('23') === 2);
assert.ok(first('1024') === 31);

assert.ok(second('1') === 2);
assert.ok(second('12') === 23);
assert.ok(second('23') === 25);
assert.ok(second('1024') === 1968);

export default {
  first,
  second
};
