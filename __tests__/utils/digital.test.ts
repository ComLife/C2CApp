import { formatKMUnit, formatNumberBase } from '../../src/utils/digital';

describe('测试 app/utils/digital.ts', () => {
  test('formatKMUnit', () => {
    let result = formatKMUnit(10000000);
    expect(result).toBe('10M');

    result = formatKMUnit(123456789);
    expect(result).toBe('123.46M');

    result = formatKMUnit(98765);
    expect(result).toBe('98.77K');

    result = formatKMUnit(34500);
    expect(result).toBe('34.5K');

    result = formatKMUnit(2000);
    expect(result).toBe('2K');

    result = formatKMUnit(100);
    expect(result).toBe('100');

    result = formatKMUnit(0);
    expect(result).toBe('--');

    result = formatKMUnit(-10);
    expect(result).toBe('--');

    result = formatKMUnit('a');
    expect(result).toBe('--');
  });

  test('formatNumberBase', () => {
    let result = formatNumberBase(10000000);
    expect(result).toBe(10000000);

    result = formatNumberBase(12.345);
    expect(result).toBe(12.35);

    result = formatNumberBase(12.345, 1);
    expect(result).toBe(12.3);

    result = formatNumberBase(12.345, 3);
    expect(result).toBe(12.345);

    result = formatNumberBase('a');
    expect(result).toBe(0);
  });
});
