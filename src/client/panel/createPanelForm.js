// @flow strict

type FieldType = {
  name: string,
  label?: string,
  placeholder?: string, 
};

type PropsType = {
  fields: Array<FieldType>,
  onChange: (field: FieldType) => mixed,
};

export function createPanelForm({fields}: PropsType) {
  const refs = new Map<string, HTMLElement>();
  const panel = document.createElement('div');
  panel.className = 'panel panel-form';

  fields.forEach(fieldData => {
    const field = document.createElement('div');
    const input = document.createElement('input');
    refs.set(fieldData.name, input);

    field.className = 'panel-form__field';
    input.placeholder = fieldData.placeholder || '';
    input.addEventListener('change', getChangeHandler(fieldData));

    field.appendChild(input);
    panel.appendChild(field);
  });

  function getChangeHandler(data: FieldType) {
    return () => console.log({data});
  }

  function setValue(name: string, value: string | number) {
    console.log(name, value);
  }

  return {
    panel,
    setValue,
  };
}
