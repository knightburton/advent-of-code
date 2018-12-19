import assert from 'assert';

const parseInput = input => {
  const lines = input.split('\n').filter(l => l).map(l => l.trim());
  const initialState = lines[0].replace('initial state: ', '');
  const notes = lines.splice(1).reduce((o, line) => {
    const parts = /([.#]{5})\s?=>\s?([.#])/.exec(line);

    return { ...o, [parts[1]]: parts[2] };
  }, {});

  return { initialState, notes };
};

const getStateParts = substring => substring.includes('#') ? '..' : '';

const getExpandedState = state => {
  const pre = getStateParts(state.substring(0, 4));
  const post = getStateParts(state.substring(state.length - 4, state.length));

  return {
    state: `${pre}${state}${post}`,
    pre: pre.length
  };
};

const getNextGeneration = (state, notes) => {
  let newState = state.replace(/#/g, '.').split('');

  Object.keys(notes).forEach(note => {
    let indexes = [];

    Array.from({ length: state.length - 5 }, (_, i) => i).forEach(i => {
      if (state.substring(i, i + 5) === note) indexes.push(i + 2);
    });

    indexes.forEach(index => {
      newState[index] = notes[note];
    });
  });

  return newState.join('');
};

const getNumberOfPots = (state, pre, numberOfGeneration = 0, generations = 0) =>
 state.split('').map((s, index) => s === '#' ? index + numberOfGeneration - pre - generations : 0).reduce((a, b) => a + b, 0);

export const first = input => {
  const { initialState, notes } = parseInput(input);
  let { state, pre } = getExpandedState(initialState);

  for (let generation = 0; generation < 20; generation++) {
    const result = getExpandedState(state);
    state = getNextGeneration(result.state, notes);
    pre += result.pre;
  }

  return getNumberOfPots(state, pre);
};


export const second = (input, numberOfGeneration = 50000000000) => {
  const { initialState, notes } = parseInput(input);
  let { state, pre } = getExpandedState(initialState);

  let generations = [];
  let generation = 1;

  while(true) {
    const result = getExpandedState(state);
    state = getNextGeneration(result.state, notes);
    pre += result.pre;

    const minified = state.slice(state.indexOf('#'), state.lastIndexOf('#'));

    if (generations.includes(minified)) {
      break;
    } else {
      generations.push(minified);
    }

    generation++;
  }

  return getNumberOfPots(state, pre, numberOfGeneration, generation);
};

assert.ok(first(`
  initial state: #..#.#..##......###...###

  ...## => #
  ..#.. => #
  .#... => #
  .#.#. => #
  .#.## => #
  .##.. => #
  .#### => #
  #.#.# => #
  #.### => #
  ##.#. => #
  ##.## => #
  ###.. => #
  ###.# => #
  ####. => #
`, 20) === 325);

assert.ok(second(`
  initial state: #..#.#..##......###...###

  ...## => #
  ..#.. => #
  .#... => #
  .#.#. => #
  .#.## => #
  .##.. => #
  .#### => #
  #.#.# => #
  #.### => #
  ##.#. => #
  ##.## => #
  ###.. => #
  ###.# => #
  ####. => #
`) === 999999999374);
