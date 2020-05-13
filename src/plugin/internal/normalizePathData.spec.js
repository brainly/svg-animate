import normalizePathData from './normalizePathData';

describe('normalizePathData()', () => {
  const data = 'M324.94,290.4s18.05-10.14,21.77-11.87,5.23,2,3,4.48-21.6,20.47-21.6,20.47Z';

  it('returns unchanged data when precision is negative', () => {
    const precision = -1;
    const result = 'M324.94,290.4C324.94,290.4,342.99,280.26,346.71,278.53C350.42999999999995,276.79999999999995,351.94,280.53,349.71,283.01C347.47999999999996,285.49,328.10999999999996,303.48,328.10999999999996,303.48C328.10999999999996,303.48,324.94,290.4,324.94,290.4';

    expect(normalizePathData(data, precision)).toBe(result);
  });

  it('rounds data paths to given precision', () => {
    const precision = 2;
    const result = 'M324.94,290.4C324.94,290.4,342.99,280.26,346.71,278.53C350.43,276.8,351.94,280.53,349.71,283.01C347.48,285.49,328.11,303.48,328.11,303.48C328.11,303.48,324.94,290.4,324.94,290.4';

    expect(normalizePathData(data, precision)).toBe(result);
  });

  it('rounds data paths to integer when precision is 0', () => {
    const precision = 0;
    const result = 'M325,290C325,290,343,280,347,279C350,277,352,281,350,283C347,285,328,303,328,303C328,303,325,290,325,290';

    expect(normalizePathData(data, precision)).toBe(result);
  });
});
