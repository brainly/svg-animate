const cheerio = require('cheerio');
const parse = require('parse-svg-path');
const abs = require('abs-svg-path');
const normalize = require('normalize-svg-path');
const serialize = require('serialize-svg-path');

const options = {
  xmlMode: true
};

function getAnimatedElements(selector, html, spec) {
  const $ = cheerio.load(html, options);
  const supportedElements = Object.keys(spec);
  const elements = [];

  if (!supportedElements.length) {
    return elements;
  }

  $(`[id*='${selector}']`).each((index, elem) => {
    const {name, attribs} = elem;

    if (supportedElements.includes(name)) {
      const attrs = spec[name].reduce((result, attr) => {
        if (attribs[attr] === undefined) {
          return result;
        }
        if (attr === 'd') {
          result[attr] = normalizePathDefinition(attribs[attr])
        } else {
          result[attr] = attribs[attr];
        }
        return result;
      }, {});

      elements.push({
        id: attribs.id,
        element: name,
        attrs,
      });
    }
  });

  return elements;
}

function mergeFrameElements(frames) {
  // merged frames should not contain any references to other frames
  const mergedFrame = frames[0].map(cloneElement);

  // convert attributes to array and create references
  const mergedFrameAttrsRefs = mergedFrame.reduce((refs, elem) => {
    Object.keys(elem.attrs).forEach(attr => {
      elem.attrs[attr] = [elem.attrs[attr]];
    });
    return refs.set(elem.id, elem.attrs);
  }, new Map);

  for (let i = 1; i < frames.length; i++) {
    frames[i].forEach(elem => {
      const ref = mergedFrameAttrsRefs.get(elem.id);

      if (ref !== undefined) {
        Object.keys(elem.attrs).forEach(attr => {
          if (ref[attr] !== undefined) {
            ref[attr].push(elem.attrs[attr]);
          }
        });
      }
    });
  }

  return mergedFrame;
}

function alternateFrameElements(mergedElements) {
  mergedElements.forEach(elem => {
    Object.keys(elem.attrs).forEach(attr => {
      const value = elem.attrs[attr];

      let index = value.length - 1;
      while (--index >= 0) {
        value.push(value[index]);
      }
    });
  });

  return mergedElements;
}

function animateFrameElements(html, mergedElements, config = {}) {
  const $ = cheerio.load(html, options);

  mergedElements.forEach(elem => {
    const {id, attrs} = elem;
    const $elem = $(`#${id}`);

    if (!$elem.length) {
      return;
    }
    const children = Object.keys(attrs).reduce((string, attr) => {
      if (attrs[attr].length > 1) {
        const {
          duration = '1s',
          delay = '0s'
        } = config[id] || config['default'] || {};

        string += createAnimateElement({
          attributeName: attr,
          values: attrs[attr].join(';'),
          repeatCount: 'indefinite',
          dur: duration,
          begin: delay
        });
      }
      return string;
    }, '');

    $elem.prepend(children);
  });

  return $.xml();
}

function cloneElement(elem) {
  const clone = Object.assign({}, elem);
  clone.attrs = Object.assign({}, elem.attrs);
  return clone;
}

function createAnimateElement(attrs) {
  const mergedAttrs = Object.keys(attrs)
    .map(name => `${name}="${attrs[name]}"`)
    .join(' ');
  return `<animate ${mergedAttrs}></animate>`;
}

function normalizePathDefinition(def) {
  return serialize(normalize(abs(parse(def))));
}

module.exports = {
  cloneElement,
  getAnimatedElements,
  mergeFrameElements,
  alternateFrameElements,
  animateFrameElements
};
