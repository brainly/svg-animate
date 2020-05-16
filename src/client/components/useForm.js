// @flow strict

import React, {useState} from 'react';

export type FormFieldsType = {
  [name: string]: {
    value: string,
    pattern?: RegExp,
    invalid?: boolean,
  },
  ...
};

type PropsType = {
  initial?: FormFieldsType,
  onUpdate: (fields: FormFieldsType) => mixed,
};

export function useForm({initial = {}, onUpdate}: PropsType) {
  const [fields, setFields] = useState<FormFieldsType>(initial);

  function getFieldProps(name: string) {
    return {
      value: fields[name].value || '',
      invalid: fields[name].invalid || false,
      onChange: (event: SyntheticInputEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const {pattern} = fields[name];
        const invalid = isInvalid(value, pattern);

        const nextFields = {
          ...fields,
          [name]: {
            value,
            pattern,
            invalid,
          },
        };

        setFields(nextFields);
        if (!invalid) {
          onUpdate(nextFields);
        }
      },
    };
  }

  return {
    getFieldProps,
    formFields: fields,
  };
}

function isInvalid(value: string, pattern: ?RegExp) {
  return value && pattern ? !pattern.test(value) : false;
}
