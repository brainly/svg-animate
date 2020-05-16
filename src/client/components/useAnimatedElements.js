// @flow strict

import React, {useState, useEffect} from 'react';
import {getAnimatedElementIds} from '../api';

export function useAnimatedElements() {
  const [ids, setIds] = useState<Array<string>>([]);

  useEffect(() => {
    const fetch = async () => {
      setIds(await getAnimatedElementIds());
    };

    fetch();
  }, []);

  return {ids};
}
