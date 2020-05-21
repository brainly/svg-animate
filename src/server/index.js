// @flow strict

import fs from 'fs';
import bodyParser from 'body-parser';
import yaml from 'js-yaml';
import path from 'path';

import {animatedElementSelector} from './consts';
import {getLastCompilationFiles} from './compiler';
import {getAnimatedElementIds} from './frame';

// $FlowFixMe
module.exports = function (app, server, compiler) {
  const configPath = 'frames/config.json';

  app.use(bodyParser.json());

  app.post('/api/config', (req, res, next) => {
    fs.writeFileSync(configPath, JSON.stringify(req.body, null, '  '));
  });

  app.get('/api/config', (req, res, next) => {
    res.send(fs.readFileSync(configPath, 'utf8'));
  });

  app.get('/api/animated_element_ids', (req, res, next) => {
    const files = getLastCompilationFiles(compiler);
    const firstFramePath = files.find(file => file.endsWith('.svg'));
    // $FlowFixMe
    const data = fs.readFileSync(firstFramePath, 'utf8');
    res.send(getAnimatedElementIds(data, animatedElementSelector));
  });
};

function loadYamlFile(path) {
  // $FlowFixMe
  return yaml.load(fs.readFileSync(path, 'utf8'));
}
