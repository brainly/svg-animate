// @flow strict

import React from 'react';
import cx from 'classnames';

export type FieldType = {
  name: string,
  value: string,
  placeholder: string,
  disabled: boolean,
  invalid: boolean,
};

type PropsType = {
  ...FieldType,
  onChange: (name: string, value: string) => mixed,
};

export function PanelFormField({
  name,
  value,
  placeholder,
  disabled,
  invalid,
  onChange,
}: PropsType) {
  const fieldName = cx('panel-form__field', {
    'panel-form__field--invalid': invalid,
    'panel-form__field--disabled': disabled,
  });

  function handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    onChange(name, event.target.value);
  }

  return (
    <div className={fieldName}>
      <label className="panel-form__label">
        <div className="panel-form__text">{name}</div>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
