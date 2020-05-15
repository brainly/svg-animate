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
  // todo: show error when repeated ids
  // todo: show error when style html element is present

  const options = createPanelForm({
    fields: configFields,
    onChange: () => null,
  });

  const elements = createPanelList({
    items: ids.map(id => ({name: id})),
  });

  docker.appendChild(options.panel);
  docker.appendChild(elements.panel);

  // const config = await getConfig();
  // const defaultConfig = config['default'];
  // createRecord('my-element', root);
}
