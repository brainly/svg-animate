// @flow strict

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.scss';
import {Docker} from './components/Docker';

const docker = document.querySelector('.docker');

if (docker) {
  ReactDOM.render(<Docker />, docker);
}
