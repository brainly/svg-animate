// @flow strict

import fs from 'fs';
import yaml from 'js-yaml';
import {promisify} from 'util';
import FilesRevision from './internal/FilesRevision';
import {
  getAnimatedElements,
  cloneAnimatedElement,
  alternateAnimatedElementAttrs
} from './internal/elements';
import {
  mergeAnimatedFrames,
  injectAnimatedFrame
} from './internal/animation';

import type {
  OptionsType,
  ConfigType,
  AnimatedFrame,
} from './internal/types';

const readFileAsync = promisify(fs.readFile);
const readFileUtf8 = file => readFileAsync(file, 'utf8');
const loadYamlFile = path =>  yaml.load(fs.readFileSync(path, 'utf8'));

const isFrameFile = file => file.endsWith('.svg');
const isConfigFile = file => file.endsWith('config.yml');

const supportedElementAttrs = {
  path: ['d', 'fill'],
  polygon: ['points', 'fill'],
  polyline: ['points', 'stroke'],
  line: ['x1', 'y1', 'x2', 'y2']
};

class SVGAnimate {
  selector: string;
  outputPath: string;
  outputFile: string;
  options: OptionsType;
  config: ConfigType;

  animatedFrames: Map<string, AnimatedFrame>;
  revision: FilesRevision;

  constructor({
    selector = 'animate',
    outputPath = '',
    outputFile = '',
    options
  }: {
    selector: string;
    outputPath: string;
    outputFile: string;
    options: OptionsType;
  }) {
    this.selector = selector;
    this.outputPath = outputPath;
    this.outputFile = outputFile;
    this.options = options;
    this.config = {};

    this.animatedFrames = new Map();
    this.revision = new FilesRevision();
  }

  apply(compiler: any) {
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

  createAnimation(data: string) {
    const frames = Array.from(this.animatedFrames.values());
    const mergedFrame = mergeAnimatedFrames(frames);

    if (this.options.alternateDirection) {
      mergedFrame.forEach(alternateAnimatedElementAttrs);
    }
    const svg = injectAnimatedFrame(data, mergedFrame, this.config);
    this.writeAnimationFile(svg);
  }

  writeAnimationFile(data: string) {
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath);
    }

    fs.writeFile(`${this.outputPath}/${this.outputFile}`, data, () => {
      console.log('🎬 The SVG animation has been created.');
    });
  }
}

module.exports = SVGAnimate;
