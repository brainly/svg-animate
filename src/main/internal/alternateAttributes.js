// @flow strict

import type {AnimatedElement} from '../types';

function alternateAttributes(elem: AnimatedElement) {
  Object.keys(elem.attrs).forEach(attr => {
    const value = elem.attrs[attr];

    let index = value.length - 1;
    while (--index >= 0) {
      value.push(value[index]);
    }
  });
}

export default alternateAttributes;
