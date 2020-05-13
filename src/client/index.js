// @flow strict

import styles from './styles.css';

type DefaultsType = {
  duration: string,
  delay: string,
  easing: string,
};

type StateType = {
  ...DefaultsType,
  name: string,
};

const defaults: DefaultsType = {
  duration: '3s',
  delay: '0s',
  easing: 'ease',
};

initialize();

async function initialize() {
  console.log('initialize');
  const root = document.querySelector('.root');

  if (root) {
    await getSelectors();
    // const config = await getConfig();
    // const defaultConfig = config['default'];
    // createRecord('my-element', root);
  }
}

function createRecord(name: string, elem: HTMLElement) {
  const state: StateType = {...defaults, name};

  Object.keys(defaults).forEach(name => {
    const input: HTMLInputElement = document.createElement('input');

    input.placeholder = defaults[name];
    input.addEventListener('change', (event: Event) => {
      const target: HTMLInputElement = (event.target: any);
      state[name] = target.value;
      postConfig(state);
    });

    elem.appendChild(input);
  });
}

function postConfig(data) {
  return fetch('/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

function getConfig() {
  return fetch('/config').then(res => res.json());
}

function getSelectors() {
  return fetch('/selectors').then(res => res.json());
}
