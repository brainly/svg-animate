// @flow strict

import {useReducer} from 'react';
import {configReducer, type ConfigType} from '../config/reducer';
import {type ActionType} from '../config/actions';

// todo: pass defaults in parameter
const initialConfig: ConfigType = {
  defaults: {
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

  return {
    config,
    dispatch,
  };
}
