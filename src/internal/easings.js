// @flow strict

// https://easings.net/en
// https://matthewlein.com/tools/ceaser

const easing = {
  linear: '.25 .25 .75 .75',
  ease: '.25 .1 .25 1',
  easeIn: '.42 0 1 1',
  easeOut: '0 0 .58 1',
  easeInOut: '.42 0 .58 1',
  easeInQuad: '.55 .085 .68 .53',
  easeInCubic: '.55 .055 .675 .19',
  easeInQuart: '.895 .03 .685 .22',
  easeInQuint: '.755 .05 .855 .06',
  easeInSine: '.47 0 .745 .715',
  easeInExpo: '.95 .05 .795 .035',
  easeInCirc: '.6 .04 .98 .335',
  easeInBack: '.6 -.28 .735 .045',
  easeOutQuad: '.25 .46 .45 .94',
  easeOutCubic: '.215 .61 .355 1',
  easeOutQuart: '.165 .84 .44 1',
  easeOutQuint: '.23 1 .32 1',
  easeOutSine: '.39 .575 .565 1',
  easeOutExpo: '.19 1 .22 1',
  easeOutCirc: '.075 .82 .165 1',
  easeOutBack: '.175 .885 .32 1.275',
  easeInOutQuad: '.455 .03 .515 .955',
  easeInOutCubic: '.645 .045 .355 1',
  easeInOutQuart: '.77 0 .175 1',
  easeInOutQuint: '.86 0 .07 1',
  easeInOutSine: '.445 .05 .55 .95',
  easeInOutExpo: '1 0 0 1',
  easeInOutCirc: '.785 .135 .15 .86',
  easeInOutBack: '.68 -.55 .265 1.55'
};

export function getEasing(name: string, framesCount: number) {
  if (name && easing[name] !== undefined) {
    return output(easing[name], framesCount);
  }
  return output(easing['ease'], framesCount);
}

// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keySplines
// there must be one fewer sets of control points than there are frames
function output(value, framesCount) {
  return [...Array(framesCount - 1).keys()].map<string>(x => value).join(';');
}
