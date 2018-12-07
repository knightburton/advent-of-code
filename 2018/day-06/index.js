import assert from 'assert';

const getManhattanDistance = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);

export const first = input => {
  const coordinates = input.split('\n').filter(l => l).map((line, index) => {
    const parts = /^(\d*),\s(\d*)$/.exec(line);

    return {
      x: +parts[1],
      y: +parts[2],
      area: []
    };
  });

  const top = [...coordinates].sort((a, b) => a.y - b.y)[0].y;
  const bottom = [...coordinates].sort((a, b) => b.y - a.y)[0].y;
  const left = [...coordinates].sort((a, b) => a.x - b.x)[0].x;
  const right = [...coordinates].sort((a, b) => b.x - a.x)[0].x;

  [...Array(bottom + 1).keys()].forEach(y => {
    [...Array(right + 1).keys()].forEach(x => {
      const distances = coordinates.map(coord => ({ x: coord.x, y: coord.y, distance: getManhattanDistance(coord, { x, y }) }));
      const closest = distances.sort((a, b) => a.distance - b.distance);
      if (closest[0].distance < closest[1].distance) coordinates.find(({ x, y}) => x === closest[0].x && y === closest[0].y).area.push({ x, y });
    });
  });

  const areas = coordinates.filter(({ area }) => area.every(({ x, y }) => x > left && x < right && y > top && y < bottom));

  return Math.max(...areas.map(({ area }) => area.length));
};

export const second = (input, sizeLimit = 10000) => {
  const coordinates = input.split('\n').filter(l => l).map((line, index) => {
    const parts = /^(\d*),\s(\d*)$/.exec(line);

    return {
      x: +parts[1],
      y: +parts[2]
    };
  });

  const bottom = [...coordinates].sort((a, b) => b.y - a.y)[0].y;
  const right = [...coordinates].sort((a, b) => b.x - a.x)[0].x;

  let regionSize = 0;

  [...Array(bottom + 1).keys()].forEach(y => {
    [...Array(right + 1).keys()].forEach(x => {
      if (coordinates.map(coord => getManhattanDistance(coord, { x, y })).reduce((summ, md) => summ + md, 0) < sizeLimit) regionSize++;
    });
  });

  return regionSize;
};

assert.ok(first('1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9\n') === 17);

assert.ok(second('1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9\n', 32) === 16);
