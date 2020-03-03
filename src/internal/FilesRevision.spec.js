const FilesRevision = require('./files-revision');

global.Date.now = jest.fn();

describe('FilesRevision()', () => {
  it('should return all dependencies for initial build', () => {
    const revision = new FilesRevision();

    const fileDependencies = new Set();
    const fileTimestamps = new Map();

    fileDependencies.add('frame01.svg');
    fileDependencies.add('frame02.svg');

    const compilation = {
      fileDependencies,
      fileTimestamps
    };

    expect(revision.getChangedFiles(compilation)).toEqual(
      Array.from(fileDependencies)
    );
  });

  it('should return only changed files', () => {
    Date.now.mockReturnValue(20000);

    const revision = new FilesRevision();

    const fileDependencies = new Set();
    const fileTimestamps = new Map();

    fileDependencies.add('frame01.svg');
    fileDependencies.add('frame02.svg');
    fileTimestamps.set('frame01.svg', 10000);
    fileTimestamps.set('frame02.svg', 30000);

    const compilation = {
      fileDependencies,
      fileTimestamps
    };

    expect(revision.getChangedFiles(compilation)).toEqual(
      ['frame02.svg']
    );
  });
});
