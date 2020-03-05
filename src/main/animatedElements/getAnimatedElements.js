// @flow strict

import {parseHtml} from '../parser';
import parse from 'parse-svg-path';
import abs from 'abs-svg-path';
import normalize from 'normalize-svg-path';
import serialize from 'serialize-svg-path';
import type {SupportedElementAttrs, AnimatedElement} from '../types';

const normalizePathData = data => {
  return serialize(normalize(abs(parse(data))));
};

function getAnimatedElements(
  html: string,
  selector: string,
  supportedElementAttrs: SupportedElementAttrs
): Array<AnimatedElement> {
  const $ = parseHtml(html);
  const supportedElements = Object.keys(supportedElementAttrs);
  const elements = [];

  if (!supportedElements.length) {
    return elements;
  }

  $(`[id*='${selector}']`).each((index, elem) => {
    const {name, attribs} = elem;
    const attrs = {};

    if (!supportedElements.includes(name)) {
      return;
    }
    supportedElementAttrs[name].forEach(attr => {
      const attrValue = attribs[attr];

      if (attrValue === undefined) {
        return;
      }
      if (attr === 'd') {
        attrs[attr] = [normalizePathData(attrValue)];
      } else {
        attrs[attr] = [attrValue];
      }
    });

    elements.push({
      id: attribs.id,
      element: name,
      attrs,
    });
  });

  return elements;
}

export default getAnimatedElements;
