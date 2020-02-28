class FilesRevision {
  constructor() {
    this.startTime = Date.now();
    this.prevTimestamps = new Map();
  }

  getChangedFiles(compilation) {
    const filePaths = Array.from(compilation.fileTimestamps.keys());

    const changedFiles = filePaths.filter(path => {
      const currentTimestamp = compilation.fileTimestamps.get(path) || Infinity;
      return (this.prevTimestamps.get(path) || this.startTime) < currentTimestamp;
    });

    this.prevTimestamps = compilation.fileTimestamps;
    const fileDependencies = Array.from(compilation.fileDependencies);

    // for initial build
    if (changedFiles.length === 0) {
      return fileDependencies;
    }

    return changedFiles.filter(file => fileDependencies.includes(file));
  }
}

module.exports = FilesRevision;
