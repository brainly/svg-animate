// @flow strict

import cheerio from 'cheerio';
import parse from 'parse-svg-path';
import abs from 'abs-svg-path';
import normalize from 'normalize-svg-path';
import serialize from 'serialize-svg-path';
import options from './xmlOptions';

import type {SupportedElementAttrs, AnimatedElement} from './types';

export function getAnimatedElements(
  html: string,
  selector: string,
  supportedElementAttrs: SupportedElementAttrs
): Array<AnimatedElement> {
  const $ = cheerio.load(html, options);
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

export function cloneAnimatedElement(elem: AnimatedElement) {
  const clone = Object.assign({}, elem);
  const attrs = Object.assign({}, elem.attrs);

  Object.keys(attrs).forEach(attr => {
    attrs[attr] = [...attrs[attr]];
  });

  clone.attrs = attrs;
  return clone;
}

export function alternateAnimatedElementAttrs(elem: AnimatedElement) {
  Object.keys(elem.attrs).forEach(attr => {
    const value = elem.attrs[attr];

    let index = value.length - 1;
    while (--index >= 0) {
      value.push(value[index]);
    }
  });
}

function normalizePathData(data) {
  return serialize(normalize(abs(parse(data))));
}
