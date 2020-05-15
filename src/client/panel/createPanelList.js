// @flow strict

const activeClass = 'panel-list__item--active';

type ItemType = {
  name: string,
  label?: string,
};

type PropsType = {
  items: Array<ItemType>,
};

export function createPanelList({items}: PropsType) {
  const refs = new Map<string, HTMLElement>();
  const selected = new Set<ItemType>();
  const panel = document.createElement('ul');
  panel.className = 'panel panel-list';

  items.forEach(itemData => {
    const item = document.createElement('li');
    refs.set(itemData.name, item);

    item.className = 'panel-list__item';
    item.textContent = itemData.label !== undefined
      ? itemData.label
      : itemData.name;
    item.setAttribute('name', itemData.name);
    item.addEventListener('click', handleClick);

    panel.appendChild(item);
  });

  function handleClick(event: MouseEvent) {
    // $FlowFixMe
    const currentName = event.target.getAttribute('name');
    const currentItem = findByName(items, currentName);
    const selectedArray = [...selected];

    if (!currentItem) return;

    if (!event.shiftKey) {
      selectedArray.forEach(selectedItem => {
        deselectItem(selectedItem);
      });
    }

    if (findByName(selectedArray, currentName)) {
      deselectItem(currentItem);

      // leave current selected item when deselecting a multi-select
      if (!event.shiftKey && selectedArray.length > 1) {
        selectItem(currentItem);
      }
    } else {
      selectItem(currentItem);
    }
  }

  function selectItem(item: ItemType) {
    refs.get(item.name)?.classList.add(activeClass);
    selected.add(item);
  }

  function deselectItem(item: ItemType) {
    refs.get(item.name)?.classList.remove(activeClass);
    selected.delete(item);
  }

  return {
    panel,
    selected,
  };
}

function findByName(items, name) {
  return items.find(item => item.name === name);
}
