// @flow strict

import {useReducer, useEffect} from 'react';
import {debounce} from '../helpers/debounce';
import {configReducer, type ConfigType} from '../config/reducer';
import {type ActionType} from '../config/actions';

// todo: pass defaults in parameter
const initialConfig: ConfigType = {
  defaults: {
    __invalid: false,
    duration: '3s',
    delay: '0s',
    easing: 'ease',
  },
  elements: {},
};

export function useConfigStore() {
  const [config, dispatch] = useReducer<ConfigType, ActionType>(
    configReducer,
    initialConfig,
  );

  useEffect(() => {
    if (isValid(config)) {
      console.log('post config');
    }
  }, [config]);

  return {
    config,
    dispatch,
  };
}

function isValid(config) {
  if (config.defaults.__invalid) {
    return false;
  }
  for (let elem of Object.keys(config.elements)) {
    if (config.elements[elem]?.__invalid) {
      return false;
    }
  }
  return true;
}
