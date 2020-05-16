// @flow strict

import React, {useState} from 'react';

type OutputType<T> = {
  selection: Set<T>,
  select: (elem: T, shiftKey: boolean) => mixed,
  isSelected: (elem: T) => boolean,
};

export function useSelection<T>(): OutputType<T> {
  const [selection, setSelection] = useState<Set<T>>(new Set());

  function select(elem: T, shiftKey: boolean) {
    const nextSelection = new Set(shiftKey ? selection : []);

    if (selection.has(elem)) {
      nextSelection.delete(elem);

      // leave currently selected element
      // when deselecting multiple elements
      if (!shiftKey && selection.size > 1) {
        nextSelection.add(elem);
      }
    } else {
      nextSelection.add(elem);
    }

    setSelection(nextSelection);
  }

  function isSelected(elem: T): boolean {
    return selection.has(elem);
  }

  return {
    selection,
    select,
    isSelected,
  };
}
