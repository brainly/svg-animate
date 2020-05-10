// @flow strict

import {parseHtml} from '../parser';
import normalizePathData from './normalizePathData';
import type {
  SupportedElementAttrs,
  AnimatedElement,
  OptionsType,
} from '../types';

function getAnimatedElements({
  html,
  selector,
  supportedElementAttrs,
  options = {},
}: {
  html: string,
  selector: string,
  supportedElementAttrs: SupportedElementAttrs,
  options?: OptionsType,
}): Array<AnimatedElement> {
  const $ = parseHtml(html);
  const supportedElements = Object.keys(supportedElementAttrs);
  const {pathPrecision = -1} = options;
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
        attrs[attr] = [normalizePathData(attrValue, pathPrecision)];
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
