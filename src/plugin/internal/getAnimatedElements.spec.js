import getAnimatedElements from './getAnimatedElements';

describe('getAnimatedElements()', () => {
  const supportedElementAttrs = {
    path: ['d'],
    polygon: ['points'],
  };

  it('should not parse unsupported element', () => {
    const html = `
      <svg>
        <rect id="rect-animate" width="100" height="100"/>
      </svg>`;

    expect(
      getAnimatedElements({
        html,
        selector: 'animate',
        supportedElementAttrs,
      })
    ).toEqual([]);
  });

  it('should parse all supported elements', () => {
    const html = `
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"/>
        <rect id="rect-animate" width="100" height="100"/>
        <polygon id="polygon-animate" points="M0 0 L10 10z"/>
      </svg>`;

    expect(
      getAnimatedElements({
        html,
        selector: 'animate',
        supportedElementAttrs,
      })
    ).toEqual([
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

    expect(
      getAnimatedElements({
        html,
        selector: 'animate',
        supportedElementAttrs,
      })
    ).toEqual([
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

    expect(
      getAnimatedElements({
        html,
        selector: 'animate',
        supportedElementAttrs,
      })
    ).toEqual([
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
