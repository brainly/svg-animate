// @flow strict

import React from 'react';
import cx from 'classnames';

export type FieldType = {
  name: string,
  value: string,
  placeholder: string,
  disabled: boolean,
  invalid: boolean,
  pattern: ?RegExp,
};

export type PropsType = {
  ...FieldType,
  onChange: (name: string, value: string, invalid: boolean) => mixed,
};

export function PanelFormField({
  name,
  value,
  placeholder,
  disabled,
  invalid,
  pattern,
  onChange,
}: PropsType) {
  const fieldName = cx('panel-form__field', {
    'panel-form__field--invalid': invalid,
    'panel-form__field--disabled': disabled,
  });

  function handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const value = event.target.value;
    onChange(name, value, isInvalid(value, pattern));
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

export function isInvalid(value: string, pattern: ?RegExp) {
  return value && pattern ? !pattern.test(value) : false;
}
