const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const readFileUtf8 = file => readFileAsync(file, 'utf8');

const {
  getAnimatedPaths,
  replaceAnimatedPaths,
  combineAnimatedPaths,
  alternateAnimatedPaths
} = require('./svg-helpers');

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
        .then(data => this.combineFrames(data))
        .catch(err => console.error(err));
    });
  }

  combineFrames(frames) {
    const paths = frames
      .map(data => getAnimatedPaths(this.selector, data))
      .reduce(combineAnimatedPaths, {});

    if (this.options.alternateDirection) {
      alternateAnimatedPaths(paths);
    }
    const svg = replaceAnimatedPaths(frames[0], paths);
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
