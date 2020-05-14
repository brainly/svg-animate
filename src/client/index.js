// @flow strict

import styles from './styles.scss';
import {postConfig, getAnimatedElementIds} from './api';
import {createPanelForm, createPanelList} from './panel';

const configFields = [
  {
    name: 'duration',
    placeholder: '3s',
  },
  {
    name: 'delay',
    placeholder: '0s',
  },
  {
    name: 'easing',
    placeholder: 'ease',
  }
];

initialize();

async function initialize() {
  console.log('initialize');

  const docker = document.querySelector('.docker');
  if (!docker) return;

  const ids = await getAnimatedElementIds();

  docker.appendChild(
    createPanelForm({
      fields: configFields,
      onChange: () => null,
      setup: setValue => {
        console.log(setValue)
      }
    })
  );

  docker.appendChild(
    createPanelList({
      items: ids.map(id => ({name: id})),
      onSelect: () => null,
    })
  );

  console.log(ids);
  // const config = await getConfig();
  // const defaultConfig = config['default'];
  // createRecord('my-element', root);
}
