// @flow strict

import React, {type Node} from 'react';
import {debounce} from '../helpers/debounce';
import {useForm, type FormFieldsType} from './useForm';
import {PanelFormField, type FieldType} from './PanelFormField';

type PropsType = {
  fields: Array<FieldType>,
};

const onUpdate = debounce<FormFieldsType>(form => {
  console.log(form);
}, 500);

export function PanelForm({fields}: PropsType) {
  const {getFieldProps, formFields} = useForm({
    initial: getInitialFields(fields),
    onUpdate,
  });

  return (
    <div className="panel panel-form">
      {fields.map(field => (
        <PanelFormField
          {...field}
          {...getFieldProps(field.name)}
          key={field.name}
        />
      ))}
    </div>
  );
}

function getInitialFields(fields: Array<FieldType>) {
  return fields.reduce<FormFieldsType>((initial, field) => {
    initial[field.name] = {
      value: '',
      pattern: field.pattern,
    };
    return initial;
  }, {});
}
