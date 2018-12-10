import assert from 'assert';

const getInstructions = input => {
  let instructions = {};
  input.split('\n').filter(l => l).forEach(line => {
    const [, from, to] = /.*\s([A-Z])\s.*\s([A-Z])\s.*/.exec(line);

    if (!instructions[from]) instructions[from] = [];
    if (!instructions[to]) instructions[to] = [];
    instructions[to] = [...instructions[to], from];
  });

  return instructions;
};

export const first = input => {
  let instructions = getInstructions(input);

  let available = Object.keys(instructions).sort();
  let order = [];

  while (true) {
    const nextSteps = available.filter(step => instructions[step].every(innerStep => order.includes(innerStep)));

    if (nextSteps.length === 0) return order.join('');

    order = [...order, nextSteps[0]];
    available = available.filter(step => step !== nextSteps[0]);
  }
};

export const second = (input, workers = 5, seconds = 0) => {
  let instructions = getInstructions(input);

  let available = Object.keys(instructions).sort();
  let inProgress = [];
  let order = [];
  let time = 0;

  while(true) {
    inProgress = inProgress.map(({ time, step }) => ({ time: time + 1, step })).filter(({ time, step }) => {
      if (time < step.charCodeAt(0) - 4 + seconds) {
        return true;
      } else {
        order.push(step);
        return false;
      }
    });

    const nextSteps = available.filter(step => instructions[step].every(innerStep => order.includes(innerStep)));

    if (nextSteps.length === 0 && inProgress.length === 0) return time;

    while (inProgress.length < workers && nextSteps.length > 0) {
      const nextStep = nextSteps.shift();
      available = available.filter(step => step !== nextStep);
      inProgress.push({ step: nextStep, time: 0 });
    }

    time++;
  }
};

assert.ok(first(`
  Step C must be finished before step A can begin.
  Step C must be finished before step F can begin.
  Step A must be finished before step B can begin.
  Step A must be finished before step D can begin.
  Step B must be finished before step E can begin.
  Step D must be finished before step E can begin.
  Step F must be finished before step E can begin.
`) === 'CABDFE');

assert.ok(second(`
  Step C must be finished before step A can begin.
  Step C must be finished before step F can begin.
  Step A must be finished before step B can begin.
  Step A must be finished before step D can begin.
  Step B must be finished before step E can begin.
  Step D must be finished before step E can begin.
  Step F must be finished before step E can begin.
`, 2, -60) === 15);
