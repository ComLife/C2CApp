import { getEncryptWithAES, getSigString, getSignWithRSAAndAES, objectSorting } from '../../src/utils/signature';

describe('测试 app/utils/signature.js', () => {
  test('objectSorting', () => {
    const param1 = { versionNo: '2.0.1', versionName: 'wallet_ios' };
    const result1 = objectSorting(param1);
    expect(result1).toStrictEqual({ versionName: 'wallet_ios', versionNo: '2.0.1' });

    const param2 = { version2No: '2.0.1', version1Name: 'wallet_ios' };
    const result2 = objectSorting(param2);
    expect(result2).toStrictEqual({ version1Name: 'wallet_ios', version2No: '2.0.1' });

    const param3 = { VERSION2NAME: '2.0.1', VERSION1NAME: 'wallet_ios' };
    const result3 = objectSorting(param3);
    expect(result3).toStrictEqual({ VERSION1NAME: 'wallet_ios', VERSION2NAME: '2.0.1' });

    const param4 = { version1name: '2.0.1', VERSION1NAME: 'wallet_ios' };
    const result4 = objectSorting(param4);
    expect(result4).toStrictEqual({ VERSION1NAME: 'wallet_ios', version1name: '2.0.1' });

    const param5 = { '111': '2.0.1', '22': 'wallet_ios' };
    const result5 = objectSorting(param5);
    expect(result5).toStrictEqual({ '22': 'wallet_ios', '111': '2.0.1' });

    const param6 = {};
    const result6 = objectSorting(param6);
    expect(result6).toStrictEqual({});

    const param7 = null;
    const result7 = objectSorting(param7);
    expect(result7).toStrictEqual({});

    const param8 = { AAA: '222', aaa: '333', '111': '111' };
    const result8 = objectSorting(param8);
    expect(result8).toStrictEqual({ '111': '111', AAA: '222', aaa: '333' });

    const param9 = { aaa: '333', AAA: '222', '111': '111' };
    const result9 = objectSorting(param9);
    expect(result9).toStrictEqual({ '111': '111', AAA: '222', aaa: '333' });

    const param10 = { '111': '111', aaa: '333', AAA: '222' };
    const result10 = objectSorting(param10);
    expect(result10).toStrictEqual({ '111': '111', AAA: '222', aaa: '333' });
  });

  // 用于 request body 内容
  test('getEncryptWithAES1', () => {
    /* eslint-disable @typescript-eslint/camelcase */
    const input = { phone: '13221981024', password: 'a11111', encrypt_flag: false };
    const result = getEncryptWithAES(input);
    console.log('用于 request body 内容:', result);
    const expected = 'xe5qy9X9OOTVLkLq1dKM3+E0VmDfzeZg4h5HeXeU/yriM6TkV8EaFqKaqK3sFO5dd9WOVkE+jUJBSOujTUyuNEpJDvrKJSpaQI+1CJQOb9M=';
    expect(result).toStrictEqual(expected);
  });

  // 用于 header sign 字段
  test('getSignWithRSAAndAES1', () => {
    const result = getSignWithRSAAndAES();
    console.log('用于 header sign 字段（返回值每次不一样）:', result);
    expect(result).toHaveLength(172);
  });

  // 用于 header signature 验签字段
  test('getSigString1', () => {
    const json = { phone: '13221981024', password: 'a11111', encrypt_flag: false };
    const result = getSigString(json);
    const expected =
      '210f3d9e03a9f2b84fbd9595fe4629b4317fd21730c4ea067126217630a44e34d042e5c99661ded544e141df18fc867c7da9f0886cc672c98521bbbd03803fc94961fdb57a408791410fb1e2adf6a7582c941234cc8fccb43624c4c9b53cfb430af2308603af1552360ac0617acce093ce29dd9c82013b4c428f6311aa09a8e5';
    console.log('用于 header signature 验签字段 - signature:', result);
    expect(result).toBe(expected);
  });
});
