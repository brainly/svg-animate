// @flow strict

import parse from 'parse-svg-path';
import abs from 'abs-svg-path';
import normalize from 'normalize-svg-path';
import serialize from 'serialize-svg-path';

function normalizePathData(data: string, precision: number) {
  const normal = normalize(abs(parse(data)));

  if (precision < 0) {
    return serialize(normal);
  }

  for (let path of normal) {
    for (let index = 0; index < path.length; index++) {
      const value = path[index];

      if (typeof value === 'number') {
        path[index] = +value.toFixed(precision);
      }
    }
  }
  return serialize(normal);
}

export default normalizePathData;
