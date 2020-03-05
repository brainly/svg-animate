// @flow strict

import type {AnimatedElement} from '../types';

function cloneAnimatedElement(elem: AnimatedElement) {
  const clone = Object.assign({}, elem);
  const attrs = Object.assign({}, elem.attrs);

  Object.keys(attrs).forEach(attr => {
    attrs[attr] = [...attrs[attr]];
  });

  clone.attrs = attrs;
  return clone;
}

export default cloneAnimatedElement;
