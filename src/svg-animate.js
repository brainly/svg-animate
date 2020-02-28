const fs = require('fs');
const yaml = require('js-yaml');
const {promisify} = require('util');
const FilesRevision = require('./files-revision');

const readFileAsync = promisify(fs.readFile);
const readFileUtf8 = file => readFileAsync(file, 'utf8');
const loadYamlFile = path =>  yaml.load(fs.readFileSync(path, 'utf8'));

const isFrameFile = file => file.endsWith('.svg');
const isConfigFile = file => file.endsWith('config.yml');

const {
  getAnimatedElements,
  mergeFrameElements,
  alternateFrameElements,
  animateFrameElements
} = require('./svg-helpers');

const spec = {
  path: ['d', 'fill'],
  polygon: ['points', 'fill'],
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

    this.frameElements = new Map();
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
      const baseFramePath = Array.from(compilation.fileDependencies).find(isFrameFile);
      const changedFramesPath = changedFiles.filter(isFrameFile);

      Promise.all(changedFramesPath.map(readFileUtf8))
        .then(changedFramesData => {
          changedFramesData.forEach((data, index) => {
            const elements = getAnimatedElements(this.selector, data, spec);
            this.frameElements.set(changedFramesPath[index], elements);
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

  createAnimation(baseFrameData) {
    const elements = Array.from(this.frameElements.values());
    const mergedFrameElements = mergeFrameElements(elements);

    if (this.options.alternateDirection) {
      alternateFrameElements(mergedFrameElements);
    }
    const svg = animateFrameElements(baseFrameData, mergedFrameElements, this.config);
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
