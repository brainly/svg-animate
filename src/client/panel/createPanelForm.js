// @flow strict

type FieldType = {
  name: string,
  label?: string,
  placeholder?: string, 
};

type SetValueType = (name: string, value: string) => mixed;

type PropsType = {
  fields: Array<FieldType>,
  setup: (setValue: SetValueType) => mixed,
  onChange: (field: FieldType) => mixed,
};

export function createPanelForm({fields, setup}: PropsType) {
  const entries = new Map();
  const panel = document.createElement('div');
  panel.className = 'panel panel-form';

  fields.forEach(field => {
    const elem = document.createElement('div');
    const input = document.createElement('input');

    elem.className = 'panel-form__field';
    elem.appendChild(input);
    input.placeholder = field.placeholder || '';
    input.addEventListener('change', getChangeHandler(field));
    panel.appendChild(elem);
    entries.set(field.name, input);
  });

  function getChangeHandler(field) {
    return () => {
      console.log({field});
    }
  }

  function setValue(name, value) {
    console.log(name, value);
  }

  setup(setValue);
  return panel;
}


// (event: Event) => {
//       const target: HTMLInputElement = (event.target: any);
//       state[name] = target.value;
//       postConfig(state);
//     }