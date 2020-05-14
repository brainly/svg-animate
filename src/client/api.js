// @flow strict

export function postConfig(data: {}) {
  return fetch('/api/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export function getConfig(): Promise<{}> {
  return fetch('/api/config').then(res => res.json());
}

export function getAnimatedElementIds(): Promise<Array<string>> {
  return fetch('/api/animated_element_ids').then(res => res.json());
}
