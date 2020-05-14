// @flow strict

import {parseHtml} from '../plugin/parser';

export function getAnimatedElementIds(html: string, selector: string): Array<string> {
  const $ = parseHtml(html);
  const selectors = [];

  $(`[id*='${selector}']`).each((index, elem) => {
    selectors.push(elem.attribs.id);
  });

  return selectors;
}
