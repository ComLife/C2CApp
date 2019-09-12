import { formatHHmmss } from '../../src/utils/date-time';

describe('测试 app/utils/datetime-util.ts', () => {
  test('format', () => {
    // case 1
    let date = 1563534251203;
    let result = formatHHmmss(date);
    let expected = '19:04:11';
    expect(result).toStrictEqual(expected);
  });
});
