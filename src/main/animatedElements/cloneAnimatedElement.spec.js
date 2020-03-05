import cloneAnimatedElement from './cloneAnimatedElement';

describe('cloneAnimatedElement()', () => {
  it('should create new instances', () => {
    const element = {
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M0 0 L10 10z']
      }
    };

    const clone = cloneAnimatedElement(element);
    expect(element).not.toBe(clone);
    expect(element.attrs).not.toBe(clone.attrs);
    expect(element.attrs['d']).not.toBe(clone.attrs['d']);

    expect(clone).toEqual({
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M0 0 L10 10z']
      }
    });
  });
});
