// @flow strict

import cloneAnimatedElement from './cloneAnimatedElement';
import type {AnimatedElement, AnimatedFrame} from '../types';

function mergeAnimatedFrames(frames: Array<AnimatedFrame>) {
  // merged frame should not contain any references to other frames
  const mergedFrame = frames[0].map<AnimatedElement>(cloneAnimatedElement);
  const mergedFrameAttrsRefs = mergedFrame.reduce((refs, elem) => {
    return refs.set(elem.id, elem.attrs);
  }, new Map<string, $PropertyType<AnimatedElement, 'attrs'>>);

  // merge other frames to the first one
  for (let index = 1; index < frames.length; index++) {
    frames[index].forEach(elem => {
      const ref = mergedFrameAttrsRefs.get(elem.id);

      if (ref === undefined) {
        return;
      }
      Object.keys(elem.attrs).forEach(attr => {
        if (ref[attr]) {
          const elemAttrValue = elem.attrs[attr][0];
          const lastAttrValue = ref[attr][ref[attr].length - 1];

          if (elemAttrValue !== lastAttrValue) {
            ref[attr].push(elemAttrValue);
          }
        }
      });
    });
  }

  return mergedFrame;
}

export default mergeAnimatedFrames;
