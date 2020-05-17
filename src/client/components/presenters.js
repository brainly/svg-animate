// @flow strict

import {type ConfigType} from '../config/reducer';
import {type ItemType} from './PanelListItem';
import {type FieldType} from './PanelFormField';

const timePattern = /^\d+(s|ms)$/;
const fieldsPatterns = {
  duration: timePattern,
  delay: timePattern,
  easing: undefined,
};

export function formatFormFields(
  config: ConfigType,
  selection: Array<ItemType>,
): Array<FieldType> {
  if (!selection.length) {
    return Object.keys(config.defaults).map(name => ({
      name,
      value: '',
      placeholder: config.defaults[name] ?? '',
      invalid: false,
      disabled: true,
    }));
  }

  const uniqueParams = getUniqueParams(config, selection);
  return Object.keys(config.defaults).map(name => {
    const paramValue = uniqueParams[name];
    const value = paramValue ?? '';

    return {
      name,
      value,
      placeholder: (paramValue !== null && config.defaults[name]) || 'n/a',
      invalid: isInvalid(value, fieldsPatterns[name]),
      disabled: paramValue === null,
    };
  });
}

export function formatListItems(
  config: ConfigType,
  ids: Array<string>,
): Array<ItemType> {
  return ids.map(name => ({
    name,
    params: !!config.elements[name],
  }));
}

function isInvalid(value: string, pattern: ?RegExp) {
  return value && pattern ? !pattern.test(value) : false;
}

export function getUniqueParams(
  config: ConfigType,
  selection: Array<ItemType>,
): {[name: string]: string | null, ...} {
  if (!selection.length) {
    return {};
  }
  const params = {};
  const paramsTable = {};

  for (let elem of selection) {
    const currentParams = config.elements[elem.name] ?? {};
    for (let name of Object.keys(currentParams)) {
      paramsTable[name] = true;
    }
  }

  for (let elem of selection) {
    const currentParams = config.elements[elem.name] ?? {};

    for (let name of Object.keys(paramsTable)) {
      if (params[name] === undefined) {
        params[name] = currentParams[name] ?? null;
      } else if (params[name] !== currentParams[name]) {
        params[name] = null;
      }
    }
  }

  return params;
}
