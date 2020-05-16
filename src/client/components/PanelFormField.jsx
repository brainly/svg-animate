// @flow strict

import React from 'react';
import cx from 'classnames';

export type FieldType = {
  name: string,
  placeholder?: string,
  pattern?: RegExp,
};

type PropsType = {
  ...FieldType,
  value: string,
  invalid?: boolean,
  onChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
};

export function PanelFormField({
  name,
  value,
  placeholder,
  pattern,
  invalid,
  onChange,
}: PropsType) {
  const fieldName = cx('panel-form__field', {
    'panel-form__field--invalid': invalid,
  });

  return (
    <div className={fieldName}>
      <label className="panel-form__label">
        <div className="panel-form__text">{name}</div>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          pattern={pattern}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
