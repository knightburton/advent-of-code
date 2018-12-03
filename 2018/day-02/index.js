import assert from 'assert';

export const first = input => Object.values(input.split('\n').filter(_ => _).reduce((acc, line) => {
  const summary = line.split('').reduce((acc, char) => !!acc[char] ? { ...acc, [char]: acc[char] + 1 } : { ...acc, [char]: 1 }, {});
  const internalTwo = Object.keys(summary).filter(char => summary[char] === 2).length ? 1 : 0;
  const internalThree = Object.keys(summary).filter(char => summary[char] === 3).length ? 1 : 0;
  return { two: acc.two + internalTwo, three: acc.three + internalThree };
}, { two: 0, three: 0 })).reduce((a, b) => a * b);

export const second = input => {
  const lines = input.split('\n').filter(_ => _).map(line => line.split(''));

  for (const line of lines) {
    for (const secondLine of lines) {
      const almost = line.filter((char, index) => char === secondLine[index]);
      if (almost.length === line.length - 1) return almost.join('');
    }
  }
};

assert.ok(first('abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab\n') === 12);

assert.ok(second('abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz\n') === 'fgij');
