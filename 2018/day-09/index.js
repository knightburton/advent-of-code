import assert from 'assert';

const parseInput = input => {
  const parts = /(\d+)\splayers.*\s(\d+)\spoints/.exec(input.trim());

  return {
    numberOfPlayers: +parts[1],
    numberOfMarbles: +parts[2]
  };
};

const createPlayers = numberOfPlayers => [...Array(numberOfPlayers).keys()].reduce((o, _, index) => ({ ...o, [index + 1]: 0 }), {});

const getHighestScore = players => Object.keys(players).map(key => players[key]).sort((a, b) => b - a)[0];

export const first = (input, times = 1) => {
  const { numberOfPlayers, numberOfMarbles } = parseInput(input);
  const players = createPlayers(numberOfPlayers);

  let circle = [0];
  let index = 0;
  let player = 1;

  for (let marble = 1; marble <= (numberOfMarbles * times); marble++) {
    if (marble % 23 !== 0) {
      const position = (index + 1) % circle.length + 1

      index = position;

      circle.splice(position, 0, marble);
    } else {
      const seventh = (((index - 7) % circle.length) + circle.length) % circle.length;

      players[player] += marble + circle[seventh];
      index = seventh;

      circle.splice(seventh, 1);
    }

    player = player === numberOfPlayers ? 1 : player + 1;
  };

  return getHighestScore(players);
};

export const second = input => first(input, 100);

assert.ok(first('9 players; last marble is worth 25 points\n') === 32);
assert.ok(first('10 players; last marble is worth 1618 points\n') === 8317);
assert.ok(first('13 players; last marble is worth 7999 points\n') === 146373);
assert.ok(first('17 players; last marble is worth 1104 points\n') === 2764);
assert.ok(first('21 players; last marble is worth 6111 points\n') === 54718);
assert.ok(first('30 players; last marble is worth 5807 points\n') === 37305);

assert.ok(second('9 players; last marble is worth 25 points\n') === 22563);
