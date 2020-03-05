import mergeAnimatedFrames from './mergeAnimatedFrames';

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
