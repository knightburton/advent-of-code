import assert from 'assert';

const getNode = array => {
  const numberOfChild = array[0];
  const numberOfMetadata = array[1];

  let childNodes = [];
  let index = 0;

  if (numberOfChild > 0) {
    [...Array(numberOfChild).keys()].forEach(() => {
      const childArray = array.slice(index + 2);
      const child = getNode(childArray);
      index += getLengthOfChild(child);
      childNodes = [ ...childNodes, child ];
    });
  }

  const metadata = array.slice(index + 2, index + 2 + numberOfMetadata);

  return {
    childNodes,
    metadata,
    value: metadata.reduce((a, b) => a + b, 0)
  };
};

const getLengthOfChild = child => {
  let length = 0;

  if (child.childNodes.length) child.childNodes.forEach(child => {
    length += getLengthOfChild(child);
  });

  return 2 + length + child.metadata.length;
};

const getSummary = node => {
  let summary = 0;

  if (node.childNodes.length) node.childNodes.forEach(child => {
    summary += getSummary(child);
  });

  return summary + node.metadata.reduce((a, b) => a + b, 0);
};

const getValue = node => {
  let value = 0;

  if (node.childNodes.length) {
    node.metadata.forEach(index => {
      const childNode = node.childNodes[index - 1];

      if (childNode) value += getValue(childNode);
    });
  } else {
    value += node.metadata.reduce((a, b) => a + b, 0);
  }

  return value;
};

const parseInput = input => input.split(' ').filter(x => x).map(x => +x);

export const first = input => getSummary(getNode(parseInput(input)));

export const second = input => getValue(getNode(parseInput(input)));

assert.ok(first('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2\n') === 138);

assert.ok(second('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2\n') === 66);
