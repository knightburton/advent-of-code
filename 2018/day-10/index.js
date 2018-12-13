import assert from 'assert';

const parseInput = input => input.split('\n').filter(l => l).map(line => {
  const parts = /^.*<\s*([-]?\d+),\s*([-]?\d+)>.*<\s*([-]?\d+),\s*([-]?\d+)>$/.exec(line.trim());

  return {
    px: +parts[1],
    py: +parts[2],
    vx: +parts[3],
    vy: +parts[4]
  };
});

const drawSky = data => {
  const maxX = Math.max(...data.map(d => d.px));
  const minX = Math.min(...data.map(d => d.px));
  const maxY = Math.max(...data.map(d => d.py));
  const minY = Math.min(...data.map(d => d.py));

  const sky = [...Array(Math.abs(minY - maxY) + 1).keys()]
    .map(() => [...Array(Math.abs(minX - maxX) + 1).keys()]
    .map(() => '.'));

  data.forEach(d => sky[d.py - minY][d.px - minX] = '#');

  return sky.map(line => line.join('')).join('\n');
};

const wait = (data, howLong = false) => {
  let border = Infinity;
  let seconds = 0;

  while(true) {
    const temp = data.map(d => ({ ...d, px: d.px + d.vx, py: d.py + d.vy }));

    const maxY = Math.max(...temp.map(d => d.py));
    const minY = Math.min(...temp.map(d => d.py));
    const cordon = Math.abs(minY - maxY);

    if (border > cordon) {
      border = cordon;
      seconds++;
      data = temp.slice();
    } else {
      break;
    }
  }

  return howLong ? { seconds, data } : data;
};

export const first = input => drawSky(wait(parseInput(input)));

export const second = input => wait(parseInput(input), true).seconds;

const testInput = `
  position=< 9,  1> velocity=< 0,  2>
  position=< 7,  0> velocity=<-1,  0>
  position=< 3, -2> velocity=<-1,  1>
  position=< 6, 10> velocity=<-2, -1>
  position=< 2, -4> velocity=< 2,  2>
  position=<-6, 10> velocity=< 2, -2>
  position=< 1,  8> velocity=< 1, -1>
  position=< 1,  7> velocity=< 1,  0>
  position=<-3, 11> velocity=< 1, -2>
  position=< 7,  6> velocity=<-1, -1>
  position=<-2,  3> velocity=< 1,  0>
  position=<-4,  3> velocity=< 2,  0>
  position=<10, -3> velocity=<-1,  1>
  position=< 5, 11> velocity=< 1, -2>
  position=< 4,  7> velocity=< 0, -1>
  position=< 8, -2> velocity=< 0,  1>
  position=<15,  0> velocity=<-2,  0>
  position=< 1,  6> velocity=< 1,  0>
  position=< 8,  9> velocity=< 0, -1>
  position=< 3,  3> velocity=<-1,  1>
  position=< 0,  5> velocity=< 0, -1>
  position=<-2,  2> velocity=< 2,  0>
  position=< 5, -2> velocity=< 1,  2>
  position=< 1,  4> velocity=< 2,  1>
  position=<-2,  7> velocity=< 2, -2>
  position=< 3,  6> velocity=<-1, -1>
  position=< 5,  0> velocity=< 1,  0>
  position=<-6,  0> velocity=< 2,  0>
  position=< 5,  9> velocity=< 1, -2>
  position=<14,  7> velocity=<-2,  0>
  position=<-3,  6> velocity=< 2, -1>
`;

assert.ok(first(testInput) === `#...#..###
#...#...#.
#...#...#.
#####...#.
#...#...#.
#...#...#.
#...#...#.
#...#..###`);

assert.ok(second(testInput) === 3);
