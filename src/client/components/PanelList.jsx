// @flow strict

import React, {type Node} from 'react';
import {useSelection} from './useSelection';
import {PanelListItem, type ItemType} from './PanelListItem';

type PropsType = {
  items: Array<ItemType>,
};

export function PanelList({items}: PropsType) {
  const {selection, select, isSelected} = useSelection<ItemType>();

  function getHandleClick(item: ItemType) {
    return (event: SyntheticMouseEvent<HTMLElement>) => {
      select(item, event.shiftKey);
    };
  }

  return (
    <ul className="panel panel-list">
      {items.map(item => (
        <PanelListItem
          {...item}
          key={item.name}
          active={isSelected(item)}
          onClick={getHandleClick(item)}
        />
      ))}
    </ul>
  );
}
