// @flow strict

function createSVGAnimateElement(attrs: {[name: string]: number | string}) {
  const mergedAttrs = Object.keys(attrs)
    .map(name => `${name}="${attrs[name]}"`)
    .join(' ');
  return `<animate ${mergedAttrs}></animate>`;
}

export default createSVGAnimateElement;
