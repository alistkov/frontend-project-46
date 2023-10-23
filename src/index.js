import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');

const getDataAndKeys = (path) => {
  const data = JSON.parse(readFile(path));
  const keys = Object.keys(data);
  return [data, keys];
};

const gendiff = (path1, path2) => {
  const [data1, keys1] = getDataAndKeys(path1);
  const [data2, keys2] = getDataAndKeys(path2);
  const uniqKeys = _.uniq([...keys1, ...keys2]);
  const sortedKeys = uniqKeys.sort();

  const result = sortedKeys.flatMap((key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return `  ${key}: ${data1[key]}`;
      }
      return [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return `- ${key}: ${data1[key]}`;
    }

    return `+ ${key}: ${data2[key]}`;
  });
  return `{\n  ${result.join('\n  ')}\n}`;
};

export default gendiff;
