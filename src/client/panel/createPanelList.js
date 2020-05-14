// @flow strict

type ItemType = {
  name: string,
  label?: string,
};

type PropsType = {
  items: Array<ItemType>,
  onSelect: (item: ItemType) => mixed,
};

export function createPanelList({items, onSelect}: PropsType) {
  const panel = document.createElement('div');
  panel.className = 'panel panel-list';

  items.forEach(item => {
    const elem = document.createElement('div');

    elem.className = 'panel-list__item';
    elem.textContent = item.label !== undefined ? item.label : item.name;
    elem.addEventListener('click', getClickHandler(item));
    panel.appendChild(elem);
  });

  function getClickHandler(item) {
    return () => {
      console.log({item})
    }
  }

  return panel;
}
