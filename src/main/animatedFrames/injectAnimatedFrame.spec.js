import injectAnimatedFrame from './injectAnimatedFrame';

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
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" attributeType="XML" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="1s" begin="0s" calcMode="spline" keySplines=".25 .1 .25 1"/></path>
      </svg>`
    );
  });

  it('should append animate element based on merged multiple frames', () => {
    const mergedElements = [
      {
        id: 'path-animate',
        element: 'path',
        attrs: {
          d: ['M0 0 L10 10z', 'M10 10 L20 20z', 'M10 20 L20 30z']
        }
      }
    ];

    const html = `
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"/>
      </svg>`;

    expect(injectAnimatedFrame(html, mergedElements)).toBe(`
      <svg>
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" attributeType="XML" values="M0 0 L10 10z;M10 10 L20 20z;M10 20 L20 30z" repeatCount="indefinite" dur="1s" begin="0s" calcMode="spline" keySplines=".25 .1 .25 1;.25 .1 .25 1"/></path>
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
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" attributeType="XML" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="2s" begin="3s" calcMode="spline" keySplines=".25 .1 .25 1"/></path>
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
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" attributeType="XML" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="2s" begin="3s" calcMode="spline" keySplines=".25 .1 .25 1"/></path>
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
        <path id="path-animate" d="M0 0 L10 10z"><animate attributeName="d" attributeType="XML" values="M0 0 L10 10z;M10 10 L20 20z" repeatCount="indefinite" dur="4s" begin="5s" calcMode="spline" keySplines=".25 .1 .25 1"/></path>
      </svg>`
    );
  });
});
