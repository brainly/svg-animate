# Brainly SVG Animate

## Install

First clone this repository.

```bash
git clone https://github.com/brainly/svg-animate.git
```

Then install all necessary dependencies with yarn.

```bash
yarn
```

## How to use it

Put all SVG files (aka frames) to `frames` directory and run watcher.

```bash
yarn start
```

The watcher will open a browser with the animation preview. You can freely add/remove SVG frames or change graphics inside. After you finish, right-click on the image in the animation preview and choose `Save Image As...`.

## How to prepare SVG frames

The name of the element to animate should:
- contain `animate` keyword
- be unique and the same for all frames

## Export from Adobe Illustrator

<p align="center">
  <img width="446" alt="svg_options" src="https://user-images.githubusercontent.com/13873576/75358818-c6726f00-58b3-11ea-8c0d-a92fd189ea58.png">
</p>

## Supported SVG elements
- path: d, fill
- polygon: points, fill
- polyline: points, stroke
- line: x1, y1, x2, y2

## Attributes Configuration

The `frames` directory should contain `config.yml` with the following structure; where the attributes of the specified element override the default.

```yaml
default:
  duration: '1s'
  delay: '0s'
  easing: 'ease'

your-element-name:
  duration: '500ms' # overrides default duration
```

## Supported Easing Types

- linear
- ease
- easeIn
- easeOut
- easeInOut
- easeInQuad
- easeInCubic
- easeInQuart
- easeInQuint
- easeInSine
- easeInExpo
- easeInCirc
- easeInBack
- easeOutQuad
- easeOutCubic
- easeOutQuart
- easeOutQuint
- easeOutSine
- easeOutExpo
- easeOutCirc
- easeOutBack
- easeInOutQuad
- easeInOutCubic
- easeInOutQuart
- easeInOutQuint
- easeInOutSine
- easeInOutExpo
- easeInOutCirc
- easeInOutBack

Find best easing type for your animation here:
- [https://matthewlein.com/tools/ceaser](https://matthewlein.com/tools/ceaser)

## Limitations
It basically morphs one shape into another, so transformations: `translate`, `scale`, `rotate`, `skewX`, and `skewY` are not supported.
