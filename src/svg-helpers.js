const cheerio = require('cheerio');

const options = {
  xmlMode: true
};

function getAnimatedPaths(selector, html) {
  const $ = cheerio.load(html, options);
  const animatedPaths = [];

  $(`[id*='${selector}']`).each(function() {
    const $elem = $(this);
    animatedPaths.push({
      id: $elem.attr('id'),
      def: $elem.attr('d')
    });
  });
  return animatedPaths;
}

function replaceAnimatedPaths(html, combinedPaths) {
  const $ = cheerio.load(html, options);

  Object.keys(combinedPaths).forEach(id => {
    $(`#${id}`).prepend(
      `<animate
        attributeName="d"
        repeatCount="indefinite"
        dur="2s"
        values="${combinedPaths[id]}">
      </animate>`
    );
  });
  return $.xml();
}

function combineAnimatedPaths(result, animatedPaths) {
  for (let i = 0; i < animatedPaths.length; i++) {
    const {id, def} = animatedPaths[i];

    if (result[id] === undefined) {
      result[id] = def;
    } else {
      result[id] += `;${def}`;
    }
  }
  return result;
}

function alternateAnimatedPaths(combinedPaths) {
  Object.keys(combinedPaths).forEach(id => {
    const def = combinedPaths[id];
    const parts = def.split(';');

    parts.pop();
    parts.reverse();
    combinedPaths[id] = def + ';' + parts.join(';');
  });
  return combinedPaths;
}

module.exports = {
  getAnimatedPaths,
  replaceAnimatedPaths,
  combineAnimatedPaths,
  alternateAnimatedPaths
};
