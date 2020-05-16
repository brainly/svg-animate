// @flow strict

import React from 'react';
import cx from 'classnames';

export type ItemType = {
  name: string,
};

type PropsType = {
  ...ItemType,
  active: boolean,
  onClick: (event: SyntheticMouseEvent<HTMLElement>) => mixed,
};

export function PanelListItem({name, active, onClick}: PropsType) {
  const className = cx('panel-list__item', {
    'panel-list__item--active': active,
  });

  return (
    <li className={className} onClick={onClick}>
      {name}
    </li>
  );
}
