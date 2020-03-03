// @flow strict

const cheerio = require('cheerio');
const options = require('./xmlOptions');
const {cloneAnimatedElement} = require('./elements');

import type {AnimatedElement} from './elements';
export type AnimatedFrame = Array<AnimatedElement>;

function mergeAnimatedFrames(frames: Array<AnimatedFrame>) {
  // merged frame should not contain any references to other frames
  const mergedFrame = frames[0].map<AnimatedElement>(cloneAnimatedElement);

  // create references to the merged frame
  const mergedFrameAttrsRefs = mergedFrame.reduce((refs, elem) => {
    return refs.set(elem.id, elem.attrs);
  }, new Map<string, $PropertyType<AnimatedElement, 'attrs'>>);

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

function injectAnimatedFrame(
  html: string,
  animatedFrame: AnimatedFrame,
  config: any = {}
) {
  const $ = cheerio.load(html, options);

  animatedFrame.forEach(elem => {
    const {id, attrs} = elem;
    const $elem = $(`#${id}`);

    if (!$elem.length) {
      return;
    }
    const children = Object.keys(attrs).reduce((string, attr) => {
      if (attrs[attr].length <= 1) {
        return string;
      }
      const {
        duration = '1s',
        delay = '0s'
      } = config[id] || config['default'] || {};

      return string + createAnimateElement({
        attributeName: attr,
        values: attrs[attr].join(';'),
        repeatCount: 'indefinite',
        dur: duration,
        begin: delay
      });
    }, '');

    $elem.prepend(children);
  });

  return $.xml();
}

function createAnimateElement(attrs: {[name: string]: number | string}) {
  const mergedAttrs = Object.keys(attrs)
    .map(name => `${name}="${attrs[name]}"`)
    .join(' ');
  return `<animate ${mergedAttrs}></animate>`;
}

module.exports = {
  mergeAnimatedFrames,
  injectAnimatedFrame
};
