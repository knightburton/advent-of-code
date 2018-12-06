import assert from 'assert';

export const first = input => {
  let polymer = input.trim();
  let shouldStop = false;

  while (!shouldStop) {
    shouldStop = true;

    for (let i = 0; i < polymer.length; i++) {
      const chars = polymer.slice(i, i + 2);

      if (chars.length === 2 && (chars.charCodeAt(0) === chars.charCodeAt(1) - 32 || chars.charCodeAt(0) === chars.charCodeAt(1) + 32)) {
        polymer = `${polymer.slice(0, i)}${polymer.slice(i + 2, polymer.length)}`;
        shouldStop = false;
        break;
      }
    }
  }

  return polymer.length;
};

export const second = input => {
  const polymer = input.trim();
  const uniqueUnits = Array.from(new Set(polymer.split('').map(c => c.toLocaleUpperCase())));

  const polymersLength = uniqueUnits.map(unit => {
    const pattern = new RegExp(`[${unit}${String.fromCharCode(unit.charCodeAt(0) + 32)}]`, 'gm');
    const reducedPolymer = polymer.replace(pattern, '');
    return first(reducedPolymer);
  });

  return polymersLength.sort()[0];
};

assert.ok(first('dabAcCaCBAcCcaDA') === 10);

assert.ok(second('dabAcCaCBAcCcaDA') === 4);
