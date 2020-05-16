// @flow strict

import React, {useState, useEffect} from 'react';
import {useAnimatedElements} from './useAnimatedElements';
import {type FieldType} from './PanelFormField';
import {PanelForm} from './PanelForm';
import {PanelList} from './PanelList';

const configFields: Array<FieldType> = [
  {
    name: 'duration',
    placeholder: '3s',
    pattern: /^\d+(s|ms)$/,
  },
  {
    name: 'delay',
    placeholder: '0s',
    pattern: /^\d+(s|ms)$/,
  },
  {
    name: 'easing',
    placeholder: 'ease',
  },
];

// todo: show error when repeated ids
// todo: show error when style html element is present

export function Docker() {
  const {ids} = useAnimatedElements();
  const items = ids.map(id => ({name: id}));

  return (
    <>
      <PanelForm fields={configFields} />
      <PanelList items={items} />
    </>
  );
}

// const config = await getConfig();
// const defaultConfig = config['default'];
