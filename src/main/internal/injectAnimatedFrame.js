// @flow strict

import {parseHtml} from '../parser';
import {getEasing} from '../easings';
import createSVGAnimateElement from './createSVGAnimateElement';
import type {AnimatedFrame, ConfigType} from '../types';

function injectAnimatedFrame(
  html: string,
  animatedFrame: AnimatedFrame,
  config: ConfigType = {}
) {
  const $ = parseHtml(html);

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
        delay = '0s',
        easing = 'ease'
      } = config[id] || config['default'] || {};

      return string + createSVGAnimateElement({
        attributeName: attr,
        attributeType: 'XML',
        values: attrs[attr].join(';'),
        repeatCount: 'indefinite',
        dur: duration,
        begin: delay,
        calcMode: 'spline',
        keySplines: getEasing(easing, attrs[attr].length)
      });
    }, '');

    $elem.prepend(children);
  });

  return $.xml();
}

export default injectAnimatedFrame;
