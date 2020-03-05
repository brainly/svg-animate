import alternateAttributes from './alternateAttributes';

describe('alternateAttributes()', () => {
  it('should repeat inverted attributes', () => {
    const mergedElement = {
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M0 0 L10 10z', 'M10 10 L20 20z']
      }
    };

    alternateAttributes(mergedElement);

    expect(mergedElement).toEqual({
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M0 0 L10 10z', 'M10 10 L20 20z', 'M0 0 L10 10z']
      }
    });
  });

  it('should not repeat inversion for single attribute', () => {
    const element = {
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M0 0 L10 10z']
      }
    };

    alternateAttributes(element);

    expect(element).toEqual({
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M0 0 L10 10z']
      }
    });
  });
});
