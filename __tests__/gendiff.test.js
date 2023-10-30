import fs from 'node:fs';
import gendiff from '../src/index.js';

describe('test', () => {
  const expected = fs.readFileSync('__fixtures__/expect.txt', 'utf-8');

  test('json', () => {
    expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expected);
  });

  test('yml', () => {
    expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expected);
  });
});
