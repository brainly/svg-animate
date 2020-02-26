const {
  cloneElement,
  getAnimatedElements,
  mergeFrameElements,
  alternateFrameElements,
  animateFrameElements
} = require('./svg-helpers');

describe('cloneElement()', () => {
  it('should create new instances', () => {
    const element = {
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: 'M0 0 L10 10z'
      }
    };

    const clone = cloneElement(element);
    expect(element).not.toBe(clone);
    expect(element.attrs).not.toBe(clone.attrs);
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

    expect(getAnimatedElements('animate', html, spec)).toEqual([]);
  });

  it('should parse all supported elements', () => {
    const html = `
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"/>
        <rect id="rect-animate" width="100" height="100"/>
        <polygon id="polygon-animate" points="M0 0 L10 10z"/>
      </svg>`;

    expect(getAnimatedElements('animate', html, spec)).toEqual([
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: 'M0 0 L10 10z'
        }
      },
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: 'M0 0 L10 10z'
        }
      }
    ]);
  });

  it('should parse path element', () => {
    const html = `
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"/>
      </svg>`;

    expect(getAnimatedElements('animate', html, spec)).toEqual([
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: 'M0 0 L10 10z'
        }
      }
    ]);
  });

  it('should parse polygon element', () => {
    const html = `
      <svg>
        <polygon id="polygon-animate" points="M0 0 L10 10z"/>
      </svg>`;

    expect(getAnimatedElements('animate', html, spec)).toEqual([
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: 'M0 0 L10 10z'
        }
      }
    ]);
  });
});

describe('mergeFrameElements()', () => {
  it('should merge elements with same id from different frames', () => {
    const frame1 = [
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: 'M0 0 L10 10z'
        }
      },
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: 'M5 5 L15 15z'
        }
      }
    ];

    const frame2 = [
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: 'M10 10 L20 20z'
        }
      },
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: 'M15 15 L25 25z'
        }
      }
    ];

    expect(mergeFrameElements([frame1, frame2])).toEqual([
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0 0 L10 10z', 'M10 10 L20 20z']
        }
      },
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: ['M5 5 L15 15z', 'M15 15 L25 25z']
        }
      }
    ]);
  });

  it('should deep clone elements', () => {
    const frame1 = [{
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: 'M0 0 L10 10z'
      }
    }];

    const frame2 = [{
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: 'M10 10 L20 20z'
      }
    }];

    const result = mergeFrameElements([frame1, frame2]);
    expect(result[0]).not.toBe(frame1[0]);
    expect(result[0].attrs).not.toBe(frame1[0].attrs);
    expect(result[0].attrs).not.toBe(frame2[0].attrs);
  });
});

describe('alternateFrameElements()', () => {
  it('should repeat inverted attributes', () => {
    const mergedElements = [
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0 0 L10 10z', 'M10 10 L20 20z']
        }
      }
    ];

    alternateFrameElements(mergedElements)

    expect(mergedElements).toEqual([
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0 0 L10 10z', 'M10 10 L20 20z', 'M0 0 L10 10z']
        }
      }
    ]);
  });
});

describe('animateFrameElements()', () => {
  it('should append animate element based on merged frames', () => {
    const mergedElements = [
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0 0 L10 10z', 'M10 10 L20 20z']
        }
      }
    ];

    const html = `
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"/>
      </svg>`;

    expect(animateFrameElements(html, mergedElements)).toBe(`
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="2s"/></path>
      </svg>`
    );
  });

  it('should not append to not existing elements', () => {
    const mergedElements = [
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0 0 L10 10z', 'M10 10 L20 20z']
        }
      }
    ];

    const html = `
      <svg>
        <polygon id="polygon-animate" points="M0 0 L10 10z"/>
      </svg>`;

    expect(animateFrameElements(html, mergedElements)).toBe(`
      <svg>
        <polygon id="polygon-animate" points="M0 0 L10 10z"/>
      </svg>`
    );
  });
});
