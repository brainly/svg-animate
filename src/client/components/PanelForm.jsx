// @flow strict

import React, {type Node} from 'react';
import {PanelFormField, type FieldType} from './PanelFormField';

type PropsType = {
  fields: Array<FieldType>,
  onChange: (name: string, value: string) => mixed,
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
