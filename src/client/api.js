// @flow strict

import {type ConfigType} from './config/reducer';

export function postConfig(config: ConfigType) {
  return fetch('/api/config', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(config),
  });
}

export function getConfig(): Promise<ConfigType> {
  return fetch('/api/config').then(res => res.json());
}

export function getAnimatedElementIds(): Promise<Array<string>> {
  return fetch('/api/animated_element_ids').then(res => res.json());
}
