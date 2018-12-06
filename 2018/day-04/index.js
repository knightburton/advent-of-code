import assert from 'assert';

const generateLogs = input => input.split('\n').filter(l => l).sort().map(line => {
  const parts = /\[(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})\]\s(.*)/g.exec(line.trim());

  return {
    timestamp: new Date(`${parts[1]} ${parts[2]} ${parts[3]} ${parts[4]} ${parts[5]}`).getTime(),
    minute: +parts[5],
    message: parts[6]
  };
});

const generateSecurityTable = logs => {
  let guards = {};
  let guardInDuty = null;
  let guardAsleepMinute = null;

  logs.forEach(log => {
    if (/.*#\d*.*/.test(log.message)) {
      const id = /.*#(\d*).*/.exec(log.message)[1];
      guardInDuty = id;
      if (!guards[id]) guards[id] = { id, minutes: [...Array(60).keys()].map(() => 0), sleepTime: 0 };
    } else if (/asleep/.test(log.message)) {
      guardAsleepMinute = log.minute;
    } else {
      for (let i = guardAsleepMinute; i < log.minute; i++) {
        guards[guardInDuty].minutes[i] += 1;
        guards[guardInDuty].sleepTime += 1;
      }
    }
  });

  return guards;
};

export const first = input => {
  const securityTable = generateSecurityTable(generateLogs(input));
  const weakestGuard = Object.keys(securityTable).map(key => securityTable[key]).sort((a, b) => a.sleepTime - b.sleepTime).pop();
  const topSleepTimeMinute = weakestGuard.minutes.map((m, i) => ({ m, i })).sort((a, b) => a.m - b.m).pop().i;

  return weakestGuard.id * topSleepTimeMinute;
};

export const second = input => {
  const securityTable = generateSecurityTable(generateLogs(input));
  const scoredGuards = Object.keys(securityTable).map(key => ({
    id: +key,
    topSleep: securityTable[key].minutes.map((m, i) => ({ m, i })).sort((a, b) => b.m - a.m)[0]
  }));
  const weakestGuard = scoredGuards.sort((a, b) => a.topSleep.m - b.topSleep.m).pop();

  return weakestGuard.id * weakestGuard.topSleep.i;
};

assert.ok(first(`
  [1518-11-01 00:00] Guard #10 begins shift
  [1518-11-01 00:05] falls asleep
  [1518-11-01 00:25] wakes up
  [1518-11-01 00:30] falls asleep
  [1518-11-01 00:55] wakes up
  [1518-11-01 23:58] Guard #99 begins shift
  [1518-11-02 00:40] falls asleep
  [1518-11-02 00:50] wakes up
  [1518-11-03 00:05] Guard #10 begins shift
  [1518-11-03 00:24] falls asleep
  [1518-11-03 00:29] wakes up
  [1518-11-04 00:02] Guard #99 begins shift
  [1518-11-04 00:36] falls asleep
  [1518-11-04 00:46] wakes up
  [1518-11-05 00:03] Guard #99 begins shift
  [1518-11-05 00:45] falls asleep
  [1518-11-05 00:55] wakes up
`) === 240);

assert.ok(second(`
  [1518-11-01 00:00] Guard #10 begins shift
  [1518-11-01 00:05] falls asleep
  [1518-11-01 00:25] wakes up
  [1518-11-01 00:30] falls asleep
  [1518-11-01 00:55] wakes up
  [1518-11-01 23:58] Guard #99 begins shift
  [1518-11-02 00:40] falls asleep
  [1518-11-02 00:50] wakes up
  [1518-11-03 00:05] Guard #10 begins shift
  [1518-11-03 00:24] falls asleep
  [1518-11-03 00:29] wakes up
  [1518-11-04 00:02] Guard #99 begins shift
  [1518-11-04 00:36] falls asleep
  [1518-11-04 00:46] wakes up
  [1518-11-05 00:03] Guard #99 begins shift
  [1518-11-05 00:45] falls asleep
  [1518-11-05 00:55] wakes up
`) === 4455);
