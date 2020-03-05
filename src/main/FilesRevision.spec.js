import FilesRevision from './FilesRevision';

global.Date.now = jest.fn();

describe('FilesRevision()', () => {
  it('should return all dependencies for initial build', () => {
    const revision = new FilesRevision();

    const fileDependencies = new Set(['frame01.svg', 'frame02.svg']);
    const fileTimestamps = new Map();

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

    const fileDependencies = new Set(['frame01.svg', 'frame02.svg']);
    const fileTimestamps = new Map([
      ['frame01.svg', 10000],
      ['frame02.svg', 30000]
    ]);

    const compilation = {
      fileDependencies,
      fileTimestamps
    };

    expect(revision.getChangedFiles(compilation)).toEqual(
      ['frame02.svg']
    );
  });
});
