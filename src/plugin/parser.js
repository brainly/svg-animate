// @flow strict

import cheerio from 'cheerio';

const options = {
  xmlMode: true
};

export function parseHtml(html: string) {
  return cheerio.load(html, options);
}
