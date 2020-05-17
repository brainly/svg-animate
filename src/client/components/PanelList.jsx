// @flow strict

import React, {type Node} from 'react';
import {PanelListItem, type ItemType, identityItem} from './PanelListItem';

type PropsType = {
  items: Array<ItemType>,
  selection: Array<ItemType>,
  onClick: (item: ItemType, shiftKey: boolean) => mixed,
};

export function PanelList({items, selection, onClick}: PropsType) {
  return (
    <ul className="panel panel-list">
      {items.map(item => {
        const active = !!selection.find(identityItem(item));
        const handleClick = event => onClick(item, event.shiftKey);

        return (
          <PanelListItem
            {...item}
            key={item.name}
            active={active}
            onClick={handleClick}
          />
        );
      })}
    </ul>
  );
}
