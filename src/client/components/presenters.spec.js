import {getUniqueParams} from './presenters';

describe('getUniqueParams()', () => {
  it('returns empty object for empty selection', () => {
    const config = {};
    const selection = [];

    expect(getUniqueParams(config, selection)).toEqual({});
  });

  it('returns param when it matches for all selected elements', () => {
    const config = {
      elements: {
        foo: {delay: '10s'},
        bar: {delay: '10s'},
      },
    };
    const selection = [{name: 'foo'}, {name: 'bar'}];

    expect(getUniqueParams(config, selection)).toEqual({delay: '10s'});
  });

  it('returns null when param does not match for all selected elements', () => {
    const config = {
      elements: {
        foo: {delay: '5s'},
        bar: {delay: '10s'},
      },
    };
    const selection = [{name: 'foo'}, {name: 'bar'}];

    expect(getUniqueParams(config, selection)).toEqual({delay: null});
  });

  it('returns empty object when one of selected elements does not have params', () => {
    const config = {
      elements: {
        foo: {delay: '5s'},
      },
    };
    const selection = [{name: 'foo'}, {name: 'bar'}];

    expect(getUniqueParams(config, selection)).toEqual({
      delay: null,
    });
  });

  it('returns null when param is missing for one of selected elements', () => {
    const config = {
      elements: {
        foo: {delay: '5s'},
        bar: {delay: '5s', duration: '10s'},
      },
    };
    const selection = [{name: 'foo'}, {name: 'bar'}];

    expect(getUniqueParams(config, selection)).toEqual({
      delay: '5s',
      duration: null,
    });
  });

  it('returns multiple params', () => {
    const config = {
      elements: {
        foo: {delay: '5s', duration: '20s'},
        bar: {delay: '10s', duration: '20s'},
      },
    };
    const selection = [{name: 'foo'}, {name: 'bar'}];

    expect(getUniqueParams(config, selection)).toEqual({
      delay: null,
      duration: '20s',
    });
  });
});
