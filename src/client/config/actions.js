// @flow strict

import {type ConfigType} from './reducer';

export type ActionType =
  | {
      type: 'setConfig',
      payload: {
        config: ConfigType,
      },
    }
  | {
      type: 'setElementParam',
      payload: {
        name: string,
        paramName: string,
        paramValue: string,
      },
    }
  | {
      type: 'setElementInvalid',
      payload: {
        name: string,
        invalid: boolean,
      },
    };

// prettier-ignore
export const setConfig = (payload: {
  config: ConfigType,
}): ActionType => ({
  type: 'setConfig',
  payload,
});

export const setElementParam = (payload: {
  name: string,
  paramName: string,
  paramValue: string,
}): ActionType => ({
  type: 'setElementParam',
  payload,
});

// prettier-ignore
export const setElementInvalid = (payload: {
  name: string,
  invalid: boolean,
}): ActionType => ({
  type: 'setElementInvalid',
  payload,
});
