// @flow strict

const fs = require('fs');
const bodyParser = require('body-parser');
const yaml = require('js-yaml');

type MultiCompilerType = {
  compilers: Array<CompilerType>,
};

type CompilerType = {
  _lastCompilationFileDependencies: Array<string>,
  options: {devServer: {filename: string}},
};

// $FlowFixMe
module.exports = function(app, server, compiler) {
  app.use(bodyParser.json());

  app.post('/config', (req, res, next) => {
    console.log(req.body);
  });

  app.get('/config', (req, res, next) => {
    const files = getLastCompilationFiles(compiler);
    const path = files.find(file => file.endsWith('config.yml'));
    res.send(loadYamlFile(path));
  });

  app.get('/selectors', (req, res, next) => {
    const files = getLastCompilationFiles(compiler);
    const firstFrame = files.find(file => file.endsWith('.svg'));
    res.send(firstFrame);
  });
}

function getFramesCompiler(compiler: MultiCompilerType) {
  return compiler.compilers.find(comp =>
    comp.options.devServer.filename === 'frames.js'
  );
}

function getLastCompilationFiles(compiler) {
  const comp = getFramesCompiler(compiler);
  return comp ? Array.from(comp._lastCompilationFileDependencies) : [];
}

function loadYamlFile(path) {
  // $FlowFixMe
  return yaml.load(fs.readFileSync(path, 'utf8'));
}
