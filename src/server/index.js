// @flow strict

import fs from 'fs';
import bodyParser from 'body-parser';
import yaml from 'js-yaml';

import {animatedElementSelector} from './consts';
import {getLastCompilationFiles} from './compiler';
import {getAnimatedElementIds} from './frame';

// $FlowFixMe
module.exports = function(app, server, compiler) {
  app.use(bodyParser.json());

  app.post('/api/config', (req, res, next) => {
    console.log(req.body);
  });

  app.get('/api/config', (req, res, next) => {
    const files = getLastCompilationFiles(compiler);
    const path = files.find(file => file.endsWith('config.yml'));
    res.send(loadYamlFile(path));
  });

  app.get('/api/animated_element_ids', (req, res, next) => {
    const files = getLastCompilationFiles(compiler);
    const firstFramePath = files.find(file => file.endsWith('.svg'));
    // $FlowFixMe
    const data = fs.readFileSync(firstFramePath, 'utf8');
    res.send(getAnimatedElementIds(data, animatedElementSelector));
  });
}

function loadYamlFile(path) {
  // $FlowFixMe
  return yaml.load(fs.readFileSync(path, 'utf8'));
}
