// @flow strict

import {type ActionType} from './actions';

type ParamsMetaType = {
  __invalid: boolean,
};

type ParamsType = {
  ...ParamsMetaType,
  duration?: string,
  delay?: string,
  easing?: string,
};

export type ParamsKeyType = $Keys<$Rest<ParamsType, ParamsMetaType>>;

export type ConfigType = {
  defaults: ParamsType,
  elements: {
    [name: string]: ?ParamsType,
  },
};

export function configReducer(config: ConfigType, action: ActionType) {
  switch (action.type) {
    case 'setConfig': {
      return action.payload.config;
    }

    case 'setElementParam': {
      const {name, paramName, paramValue} = action.payload;
      const prevElement = config.elements[name] || {};
      const nextElement = {...prevElement, [paramName]: paramValue};

      return {
        ...config,
        elements: {
          ...config.elements,
          [name]: outputElement(nextElement),
        },
      };
    }

    case 'setElementInvalid': {
      const {name, invalid} = action.payload;
      const prevElement = config.elements[name] || {};
      const nextElement = {...prevElement, __invalid: invalid};

      return {
        ...config,
        elements: {
          ...config.elements,
          [name]: outputElement(nextElement),
        },
      };
    }

    default:
      (action.type: empty);
      return config;
  }
}

export function getDefaultsKeys(config: ConfigType) {
  return removeMetaKeys(Object.keys(config.defaults));
}

function removeMetaKeys(keys: Array<$Keys<ParamsType>>): Array<ParamsKeyType> {
  // $FlowFixMe
  return keys.filter(key => !key.startsWith('__'));
}

function outputElement(element) {
  const values = Object.values(element).filter(
    value => value && typeof value === 'string',
  );
  return values.length > 0 ? element : null;
}
