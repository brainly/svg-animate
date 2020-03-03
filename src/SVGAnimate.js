const fs = require('fs');
const yaml = require('js-yaml');
const {promisify} = require('util');

const readFileAsync = promisify(fs.readFile);
const readFileUtf8 = file => readFileAsync(file, 'utf8');
const loadYamlFile = path =>  yaml.load(fs.readFileSync(path, 'utf8'));
const FilesRevision = require('./internal/FilesRevision');

const {
  getAnimatedElements,
  cloneAnimatedElement,
  alternateAnimatedElementAttrs
} = require('./internal/elements');
const {
  mergeAnimatedFrames,
  injectAnimatedFrame
} = require('./internal/animation');

const isFrameFile = file => file.endsWith('.svg');
const isConfigFile = file => file.endsWith('config.yml');

const supportedElementAttrs = {
  path: ['d', 'fill'],
  polygon: ['points', 'fill'],
  polyline: ['points', 'stroke'],
  line: ['x1', 'y1', 'x2', 'y2']
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
    this.config = {};

    this.animatedFrames = new Map();
    this.revision = new FilesRevision();
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('SVGAnimate', compilation => {
      const changedFiles = this.revision.getChangedFiles(compilation);
      const configPath = changedFiles.find(isConfigFile);

      if (configPath) {
        this.config = loadYamlFile(configPath);
      }

      // process animation frames
      const changedFramesPath = changedFiles.filter(isFrameFile);
      const baseFramePath = Array.from(compilation.fileDependencies)
        .find(isFrameFile);

      Promise.all(changedFramesPath.map(readFileUtf8))
        .then(changedFramesData => {
          changedFramesData.forEach((data, index) => {
            const elements = getAnimatedElements(data, this.selector, supportedElementAttrs);
            this.animatedFrames.set(changedFramesPath[index], elements);
          });

          if (changedFramesPath[0] === baseFramePath) {
            this.createAnimation(changedFramesData[0]);
          } else {
            readFileUtf8(baseFramePath).then(frameData => {
              this.createAnimation(frameData);
            });
          }
        })
        .catch(error => {
          // node requires to catch explicitly
          throw error;
        });
    });
  }

  createAnimation(data) {
    const frames = Array.from(this.animatedFrames.values());
    const mergedFrame = mergeAnimatedFrames(frames);

    if (this.options.alternateDirection) {
      mergedFrame.forEach(alternateAnimatedElementAttrs);
    }
    const svg = injectAnimatedFrame(data, mergedFrame, this.config);
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
