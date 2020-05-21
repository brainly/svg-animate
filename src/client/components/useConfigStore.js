// @flow strict

import {useReducer, useEffect, useRef} from 'react';
import {debounce} from '../helpers/debounce';

import {postConfig, getConfig} from '../api';
import {configReducer, type ConfigType} from '../config/reducer';
import {setConfig, type ActionType} from '../config/actions';

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
  const fetching = useRef<boolean>(false);
  const [config, dispatch] = useReducer<ConfigType, ActionType>(
    configReducer,
    initialConfig,
  );

  useEffect(() => {
    const fetch = async function () {
      fetching.current = true;
      const config = await getConfig();
      setConfig({config});
    };

    fetch();
  }, []);

  useEffect(() => {
    if (!fetching.current && isValid(config)) {
      postConfig(config);
    }
    fetching.current = false;
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
