// @flow strict

import React from 'react';
import cx from 'classnames';

export type ItemType = {
  name: string,
  params: boolean,
};

type PropsType = {
  ...ItemType,
  active: boolean,
  onClick: (event: SyntheticMouseEvent<HTMLElement>) => mixed,
};

export function PanelListItem({name, params, active, onClick}: PropsType) {
  const className = cx('panel-list__item', {
    'panel-list__item--active': active,
    'panel-list__item--params': params,
  });

  return (
    <li className={className} onClick={onClick}>
      {name}
      <span className="panel-list__bullet"></span>
    </li>
  );
}

export function identityItem(item: ItemType) {
  return (other: ItemType) => item.name === other.name;
}
