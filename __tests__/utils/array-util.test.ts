import { orderBy, remove } from 'lodash';

describe('测试 app/utils/array-util.ts', () => {
  test('orderBy', () => {
    // case 1
    let users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 34 }, { name: 'fred', age: 42 }, { name: 'barney', age: 36 }];
    let expected = [{ age: 34, name: 'barney' }, { age: 36, name: 'barney' }, { age: 42, name: 'fred' }, { age: 48, name: 'fred' }];
    let result = orderBy(users, ['age', 'name'], ['asc', 'desc']);
    console.log('array orderBy====', result);
    expect(result).toStrictEqual(expected);
  });

  test('remove', () => {
    // case 1
    let users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 34 }, { name: 'fred', age: 42 }, { name: 'barney', age: 36 }];
    let expected = [{ name: 'barney', age: 34 }, { name: 'fred', age: 42 }, { name: 'barney', age: 36 }];
    let result = remove(users, { name: 'fred', age: 48 });
    console.log('users====', users);
    expect(expected).toStrictEqual(users);
  });

  test('filter', () => {
    // case 1
    let users = [{ name: 'btc', age: 'usdt' }, { name: 'btc', age: 'eth' }, { name: 'usdt', age: 'btc' }];
    let expected = [{ name: 'btc', age: 'usdt' }, { name: 'usdt', age: 'btc' }];
    let result = users.filter(u => u.name !== 'btc' || u.age !== 'eth');
    expect(expected).toStrictEqual(result);
  });
});
