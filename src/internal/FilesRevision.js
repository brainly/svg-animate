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
    const dependency = Array.from(compilation.fileDependencies);

    // for initial build
    if (changedFiles.length === 0) {
      return dependency;
    }

    return changedFiles.filter(file => dependency.includes(file));
  }
}

module.exports = FilesRevision;
