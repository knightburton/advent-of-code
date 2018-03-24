import assert from 'assert';

const first = input => {
  return input.split('\n').map(row => row.split(' ')).filter(row => row.length === new Set(row).size).length;
};

const second = input => {
  return input.split('\n').map(row => row.split(' ')).map(row => row.map(word => word.split('').sort().join(''))).filter(row => {
    return row.length === new Set(row).size
  }).length;
};

assert.ok(first('aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa') === 2);

assert.ok(second('abcde fghij\nabcde xyz ecdab\na ab abc abd abf abj\niiii oiii ooii oooi oooo\noiii ioii iioi iiio') === 3);

export default {
  first,
  second
};
