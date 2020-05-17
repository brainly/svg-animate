// @flow strict

import React, {useState} from 'react';
import {not} from '../helpers/not';

type IdentityType<T> = (elem: T) => (elem: T) => boolean;

type OutputType<T> = {
  selection: Array<T>,
  select: (elem: T, shiftKey: boolean) => mixed,
};

const instanceIdentity = a => b => a === b;

export function useSelection<T>(identity?: IdentityType<T>): OutputType<T> {
  const [selection, setSelection] = useState<Array<T>>([]);
  const identityFn = identity ?? instanceIdentity;

  function select(elem: T, shiftKey: boolean) {
    let nextSelection = shiftKey ? [...selection] : [];

    if (selection.find(identityFn(elem))) {
      nextSelection = nextSelection.filter(not(identityFn(elem)));

      // leave currently selected element
      // when deselecting multiple elements
      if (!shiftKey && selection.length > 1) {
        nextSelection.push(elem);
      }
    } else {
      nextSelection.push(elem);
    }

    setSelection(nextSelection);
  }

  return {
    selection,
    select,
  };
}
