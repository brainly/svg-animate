const {
  cloneAnimatedElement,
  getAnimatedElements,
  alternateAnimatedElementAttrs,
} = require('./elements');

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

describe('getAnimatedElements()', () => {
  const spec = {
    path: ['d'],
    polygon: ['points'],
  };

  it('should not parse unsupported element', () => {
    const html = `
      <svg>
        <rect id="rect-animate" width="100" height="100"/>
      </svg>`;

    expect(getAnimatedElements(html, 'animate', spec)).toEqual([]);
  });

  it('should parse all supported elements', () => {
    const html = `
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"/>
        <rect id="rect-animate" width="100" height="100"/>
        <polygon id="polygon-animate" points="M0 0 L10 10z"/>
      </svg>`;

    expect(getAnimatedElements(html, 'animate', spec)).toEqual([
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0,0C0,0,10,10,10,10C10,10,0,0,0,0']
        }
      },
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: ['M0 0 L10 10z']
        }
      }
    ]);
  });

  it('should parse path element', () => {
    const html = `
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"/>
      </svg>`;

    expect(getAnimatedElements(html, 'animate', spec)).toEqual([
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0,0C0,0,10,10,10,10C10,10,0,0,0,0']
        }
      }
    ]);
  });

  it('should parse polygon element', () => {
    const html = `
      <svg>
        <polygon id="polygon-animate" points="M0 0 L10 10z"/>
      </svg>`;

    expect(getAnimatedElements(html, 'animate', spec)).toEqual([
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: ['M0 0 L10 10z']
        }
      }
    ]);
  });
});

describe('alternateAnimatedElementAttrs()', () => {
  it('should repeat inverted attributes', () => {
    const mergedElement = {
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M0 0 L10 10z', 'M10 10 L20 20z']
      }
    };

    alternateAnimatedElementAttrs(mergedElement)
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

    alternateAnimatedElementAttrs(element)
    expect(element).toEqual({
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M0 0 L10 10z']
      }
    });
  });
});
