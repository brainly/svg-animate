// @flow strict

import {framesEntryPoint} from './consts';

type MultiCompilerType = {
  compilers: Array<CompilerType>,
};

type CompilerType = {
  _lastCompilationFileDependencies: Array<string>,
  options: {
    devServer: {
      filename: string,
      ...
    },
    ...
  },
};

export function getFramesCompiler(compiler: MultiCompilerType): CompilerType | null {
  const framesCompiler = compiler.compilers.find(comp => {
    return comp.options.devServer.filename === framesEntryPoint
  });
  return framesCompiler || null;
}

export function getLastCompilationFiles(compiler: MultiCompilerType): Array<string> {
  const framesCompiler = getFramesCompiler(compiler);

  if (framesCompiler) {
    return Array.from<string>(framesCompiler._lastCompilationFileDependencies);
  }
  return [];
}
