// @flow strict

import React, {useState, useEffect} from 'react';
import {debounce} from '../helpers/debounce';
import {setElementParam} from '../config/actions';
import {type ConfigType} from '../config/reducer';

import {formatFormFields, formatListItems} from './presenters';
import {useAnimatedElements} from './useAnimatedElements';
import {useConfigStore} from './useConfigStore';
import {useSelection} from './useSelection';

import {PanelForm} from './PanelForm';
import {PanelList} from './PanelList';
import {identityItem, type ItemType} from './PanelListItem';
import {type FieldType} from './PanelFormField';

// todo: show error when repeated ids
// todo: show error when style html element is present

export function Docker() {
  const {ids} = useAnimatedElements();
  const {selection, select} = useSelection<ItemType>(identityItem);
  const {config, dispatch} = useConfigStore();

  function handleFieldChange(paramName, paramValue) {
    selection.forEach(item => {
      dispatch(
        setElementParam({
          name: item.name,
          paramName,
          paramValue,
        }),
      );
    });
  }

  function handleItemClick(item, shiftKey) {
    select(item, shiftKey);
  }

  return (
    <>
      <PanelForm
        fields={formatFormFields(config, selection)}
        onChange={handleFieldChange}
      />
      <PanelList
        selection={selection}
        items={formatListItems(config, ids)}
        onClick={handleItemClick}
      />
    </>
  );
}
