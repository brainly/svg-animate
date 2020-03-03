(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const cheerio = __webpack_require__(1);

const parse = __webpack_require__(8);

const abs = __webpack_require__(9);

const normalize = __webpack_require__(10);

const serialize = __webpack_require__(11);

const options = __webpack_require__(2);

function getAnimatedElements(html, selector, supportedElementAttrs) {
  const $ = cheerio.load(html, options);
  const supportedElements = Object.keys(supportedElementAttrs);
  const elements = [];

  if (!supportedElements.length) {
    return elements;
  }

  $(`[id*='${selector}']`).each((index, elem) => {
    const {
      name,
      attribs
    } = elem;

    if (supportedElements.includes(name)) {
      const attrs = {};
      supportedElementAttrs[name].forEach(attr => {
        if (attribs[attr] === undefined) {
          return;
        }

        if (attr === 'd') {
          attrs[attr] = [normalizePathData(attribs[attr])];
        } else {
          attrs[attr] = [attribs[attr]];
        }
      });
      elements.push({
        id: attribs.id,
        element: name,
        attrs
      });
    }
  });
  return elements;
}

function cloneAnimatedElement(elem) {
  const clone = Object.assign({}, elem);
  const attrs = Object.assign({}, elem.attrs);
  Object.keys(attrs).forEach(attr => {
    attrs[attr] = [...attrs[attr]];
  });
  clone.attrs = attrs;
  return clone;
}

function alternateAnimatedElementAttrs(elem) {
  Object.keys(elem.attrs).forEach(attr => {
    const value = elem.attrs[attr];
    let index = value.length - 1;

    while (--index >= 0) {
      value.push(value[index]);
    }
  });
}

function normalizePathData(data) {
  return serialize(normalize(abs(parse(data))));
}

module.exports = {
  getAnimatedElements,
  cloneAnimatedElement,
  alternateAnimatedElementAttrs
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  xmlMode: true
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(4);

const yaml = __webpack_require__(5);

const {
  promisify
} = __webpack_require__(6);

const readFileAsync = promisify(fs.readFile);

const readFileUtf8 = file => readFileAsync(file, 'utf8');

const loadYamlFile = path => yaml.load(fs.readFileSync(path, 'utf8'));

const FilesRevision = __webpack_require__(7);

const {
  getAnimatedElements,
  cloneAnimatedElement,
  alternateAnimatedElementAttrs
} = __webpack_require__(0);

const {
  mergeAnimatedFrames,
  injectAnimatedFrame
} = __webpack_require__(12);

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
      } // process animation frames


      const changedFramesPath = changedFiles.filter(isFrameFile);
      const baseFramePath = Array.from(compilation.fileDependencies).find(isFrameFile);
      Promise.all(changedFramesPath.map(readFileUtf8)).then(changedFramesData => {
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
      }).catch(error => {
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

class FilesRevision {
  constructor() {
    this.startTime = Date.now();
    this.prevTimestamps = new Map();
  }

  getChangedFiles(compilation) {
    const existingFiles = Array.from(compilation.fileTimestamps.keys());
    const changedFiles = existingFiles.filter(path => {
      const currentTimestamp = compilation.fileTimestamps.get(path) || Infinity;
      return (this.prevTimestamps.get(path) || this.startTime) < currentTimestamp;
    });
    this.prevTimestamps = compilation.fileTimestamps;
    const dependency = Array.from(compilation.fileDependencies); // for initial build

    if (changedFiles.length === 0) {
      return dependency;
    }

    return changedFiles.filter(file => dependency.includes(file));
  }

}

module.exports = FilesRevision;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("parse-svg-path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("abs-svg-path");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("normalize-svg-path");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("serialize-svg-path");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const cheerio = __webpack_require__(1);

const options = __webpack_require__(2);

const {
  cloneAnimatedElement
} = __webpack_require__(0);

function mergeAnimatedFrames(frames) {
  // merged frame should not contain any references to other frames
  const mergedFrame = frames[0].map(cloneAnimatedElement); // create references to the merged frame

  const mergedFrameAttrsRefs = mergedFrame.reduce((refs, elem) => {
    return refs.set(elem.id, elem.attrs);
  }, new Map());

  for (let index = 1; index < frames.length; index++) {
    frames[index].forEach(elem => {
      const ref = mergedFrameAttrsRefs.get(elem.id);

      if (ref === undefined) {
        return;
      }

      Object.keys(elem.attrs).forEach(attr => {
        if (ref[attr]) {
          const elemAttrValue = elem.attrs[attr][0];
          const lastAttrValue = ref[attr][ref[attr].length - 1];

          if (elemAttrValue !== lastAttrValue) {
            ref[attr].push(elemAttrValue);
          }
        }
      });
    });
  }

  return mergedFrame;
}

function injectAnimatedFrame(html, animatedFrame, config = {}) {
  const $ = cheerio.load(html, options);
  animatedFrame.forEach(elem => {
    const {
      id,
      attrs
    } = elem;
    const $elem = $(`#${id}`);

    if (!$elem.length) {
      return;
    }

    const children = Object.keys(attrs).reduce((string, attr) => {
      if (attrs[attr].length <= 1) {
        return string;
      }

      const {
        duration = '1s',
        delay = '0s'
      } = config[id] || config['default'] || {};
      return string + createAnimateElement({
        attributeName: attr,
        values: attrs[attr].join(';'),
        repeatCount: 'indefinite',
        dur: duration,
        begin: delay
      });
    }, '');
    $elem.prepend(children);
  });
  return $.xml();
}

function createAnimateElement(attrs) {
  const mergedAttrs = Object.keys(attrs).map(name => `${name}="${attrs[name]}"`).join(' ');
  return `<animate ${mergedAttrs}></animate>`;
}

module.exports = {
  mergeAnimatedFrames,
  injectAnimatedFrame
};

/***/ })
/******/ ]);
});