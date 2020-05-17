// @flow strict

import React, {type Node} from 'react';
import {
  PanelFormField,
  type PropsType as PanelFormFieldPropsType,
  type FieldType,
} from './PanelFormField';

type PropsType = {
  fields: Array<FieldType>,
  onChange: $PropertyType<PanelFormFieldPropsType, 'onChange'>,
};

export function PanelForm({fields, onChange}: PropsType) {
  return (
    <div className="panel panel-form">
      {fields.map(field => (
        <PanelFormField {...field} key={field.name} onChange={onChange} />
      ))}
    </div>
  );
}
