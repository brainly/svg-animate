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

### Supported SVG elements
- path
- polygon

## How to export SVG frames

The **name** of shape that you want to animate should:
- contain `animate` keyword
- be unique and the same for all frames

## Export from Adobe Illustrator

<p align="center">
  <img width="446" alt="svg_options" src="https://user-images.githubusercontent.com/13873576/75358818-c6726f00-58b3-11ea-8c0d-a92fd189ea58.png">
</p>
