const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const readFileUtf8 = file => readFileAsync(file, 'utf8');

const {
  getAnimatedElements,
  mergeFrameElements,
  alternateFrameElements,
  animateFrameElements
} = require('./svg-helpers');

const spec = {
  path: ['d'],
  polygon: ['points'],
};

class SVGAnimate {
  constructor({
    selector = 'animate',
    outputPath = '',
    outputFile = '',
    options
  }) {
    this.selector = selector;
    this.outputPath = outputPath;
    this.outputFile = outputFile;
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('SVGAnimate', compilation => {
      const deps = Array.from(compilation.fileDependencies);
      const files = deps.filter(file => file.endsWith('.svg'));

      Promise.all(files.map(readFileUtf8))
        .then(data => this.mergeFrames(data))
        .catch(error => {
          throw error; // node requires to catch explicitly
        });
    });
  }

  mergeFrames(frames) {
    const mergedFrame = mergeFrameElements(
      // todo: get animated elements only for changed frames
      frames.map(data => getAnimatedElements(this.selector, data, spec))
    );

    if (this.options.alternateDirection) {
      alternateFrameElements(mergedFrame);
    }
    const svg = animateFrameElements(frames[0], mergedFrame);
    this.writeAnimationFile(svg);
  }

  writeAnimationFile(data) {
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath);
    }
    fs.writeFile(`${this.outputPath}/${this.outputFile}`, data, () => {
      console.log('🎬 The SVG animation has been created.');
    });
  }
}

module.exports = SVGAnimate;
