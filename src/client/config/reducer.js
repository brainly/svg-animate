// @flow strict

import {type ActionType} from './actions';

type ParamsType = {
  duration?: string,
  delay?: string,
  easing?: string,
};

export type ConfigType = {
  defaults: ParamsType,
  elements: {
    [name: string]: ParamsType,
    ...
  },
};

export function configReducer(config: ConfigType, action: ActionType) {
  switch (action.type) {
    case 'setElementParam':
      const {name, paramName, paramValue} = action.payload;
      const prevParams = config.elements[name] || {};
      const nextParams = {...prevParams, [paramName]: paramValue};

      return {
        ...config,
        elements: {
          ...config.elements,
          [name]: hasParams(nextParams) ? nextParams : null,
        },
      };

    default:
      return config;
  }
}

export function getConfigElement(config: ConfigType, name: string) {
  return config.elements[name] || null;
}

function hasParams(element) {
  return Object.values(element).filter(Boolean).length > 0;
}
