import {
  mergeAnimatedFrames,
  injectAnimatedFrame
} from './animation';

describe('mergeAnimatedFrames()', () => {
  it('should merge elements with same id from different frames', () => {
    const frame1 = [
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0 0 L10 10z']
        }
      },
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: ['M5 5 L15 15z']
        }
      }
    ];

    const frame2 = [
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M10 10 L20 20z']
        }
      },
      {
        id: 'polygon-animate',
        element: 'polygon',
        attrs: {
          points: ['M15 15 L25 25z']
        }
      }
    ];

    expect(mergeAnimatedFrames([frame1, frame2])).toEqual([
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
        d: ['M0 0 L10 10z']
      }
    }];

    const frame2 = [{
      id: 'path-animate',
      element: 'path',
      attrs: {
        d: ['M10 10 L20 20z']
      }
    }];

    const result = mergeAnimatedFrames([frame1, frame2]);
    expect(result[0]).not.toBe(frame1[0]);
    expect(result[0].attrs).not.toBe(frame1[0].attrs);
    expect(result[0].attrs).not.toBe(frame2[0].attrs);
  });
});

describe('injectAnimatedFrame()', () => {
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

    expect(injectAnimatedFrame(html, mergedElements)).toBe(`
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="1s" begin="0s"/></path>
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

    expect(injectAnimatedFrame(html, mergedElements)).toBe(`
      <svg>
        <polygon id="polygon-animate" points="M0 0 L10 10z"/>
      </svg>`
    );
  });

  it('should set attributes based on config', () => {
    const config = {
      'path-animate': {
        duration: '2s',
        delay: '3s'
      }
    };

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

    expect(injectAnimatedFrame(html, mergedElements, config)).toBe(`
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="2s" begin="3s"/></path>
      </svg>`
    );
  });

  it('should set attributes based on config', () => {
    const config = {
      'path-animate': {
        duration: '2s',
        delay: '3s'
      }
    };

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

    expect(injectAnimatedFrame(html, mergedElements, config)).toBe(`
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="2s" begin="3s"/></path>
      </svg>`
    );
  });

  it('should fallback attributes to default config', () => {
    const config = {
      'default': {
        duration: '4s',
        delay: '5s'
      }
    };

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

    expect(injectAnimatedFrame(html, mergedElements, config)).toBe(`
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="4s" begin="5s"/></path>
      </svg>`
    );
  });
});
