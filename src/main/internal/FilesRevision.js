// @flow strict

import type {CompilationType} from '../types';

class FilesRevision {
  startTime: number;
  prevTimestamps: Map<string, number>

  constructor() {
    this.startTime = Date.now();
    this.prevTimestamps = new Map();
  }

  getChangedFiles(compilation: CompilationType): Array<string> {
    const existingFiles = Array.from(compilation.fileTimestamps.keys());

    const changedFiles = existingFiles.filter(path => {
      const currentTimestamp = compilation.fileTimestamps.get(path) || Infinity;
      return (this.prevTimestamps.get(path) || this.startTime) < currentTimestamp;
    });

    this.prevTimestamps = compilation.fileTimestamps;
    const dependency = Array.from(compilation.fileDependencies);

    // for initial build
    if (changedFiles.length === 0) {
      return dependency;
    }

    return changedFiles.filter(file => dependency.includes(file));
  }
}

export default FilesRevision;
