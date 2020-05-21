// @flow strict

import fs from 'fs';
import yaml from 'js-yaml';
import {promisify} from 'util';

import {supportedElementAttrs} from './support';
import FilesRevision from './internal/FilesRevision';
import alternateAttributes from './internal/alternateAttributes';
import cloneAnimatedElement from './internal/cloneAnimatedElement';
import getAnimatedElements from './internal/getAnimatedElements';
import mergeAnimatedFrames from './internal/mergeAnimatedFrames';
import injectAnimatedFrame from './internal/injectAnimatedFrame';
import type {
  AnimatedFrame,
  CompilationType,
  ConfigType,
  OptionsType,
} from './types';

const readFileAsync = promisify(fs.readFile);
const readFileUtf8 = file => readFileAsync(file, 'utf8');

const isFrameFile = file => file.endsWith('.svg');
const isConfigFile = file => file.endsWith('config.json');

export class SVGAnimate {
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
    options,
  }: {
    selector: string,
    outputPath: string,
    outputFile: string,
    options: OptionsType,
  }) {
    this.selector = selector;
    this.outputPath = outputPath;
    this.outputFile = outputFile;
    this.options = options;
    this.config = {};

    this.animatedFrames = new Map();
    this.revision = new FilesRevision();
  }

  // $FlowFixMe
  apply(compiler) {
    compiler.hooks.afterEmit.tap(
      'SVGAnimate',
      (compilation: CompilationType) => {
        const dependency = Array.from(compilation.fileDependencies);
        const changedFiles = this.revision.getChangedFiles(compilation);
        const configPath = changedFiles.find(isConfigFile);

        if (configPath) {
          this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }

        this.validateExistingFrames(dependency);
        const changedFramesPath = changedFiles.filter(isFrameFile);
        const baseFramePath = dependency.find(isFrameFile);

        Promise.all(changedFramesPath.map(readFileUtf8))
          .then(changedFramesData => {
            changedFramesData.forEach((data, index) => {
              const elements = getAnimatedElements({
                html: data,
                selector: this.selector,
                supportedElementAttrs,
                options: this.options,
              });

              this.animatedFrames.set(changedFramesPath[index], elements);
            });

            if (!this.animatedFrames.size) {
              console.log('😥 There are no frames to animate.');
              return;
            }
            if (changedFramesPath[0] === baseFramePath) {
              this.createAnimation(changedFramesData[0], dependency);
            } else {
              readFileUtf8(baseFramePath).then(frameData => {
                this.createAnimation(frameData, dependency);
              });
            }
          })
          .catch(error => {
            // node requires to catch explicitly
            throw error;
          });
      },
    );
  }

  createAnimation(data: string, dependency: Array<string>) {
    const frames = this.getSortedAnimatedFrames(dependency);
    const mergedFrame = mergeAnimatedFrames(frames);

    if (this.options.alternateDirection) {
      mergedFrame.forEach(alternateAttributes);
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

  validateExistingFrames(dependency: Array<string>) {
    for (const [key] of this.animatedFrames) {
      if (!dependency.includes(key)) {
        this.animatedFrames.delete(key);
      }
    }
  }

  getSortedAnimatedFrames(dependency: Array<string>) {
    const result = [];

    dependency.filter(isFrameFile).forEach(file => {
      const elements = this.animatedFrames.get(file);
      if (elements) result.push(elements);
    });
    return result;
  }
}
