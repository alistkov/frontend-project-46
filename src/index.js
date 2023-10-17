import fs from 'fs';
import path from 'path';

export default (path1, path2) => {
  const data1 = fs.readFileSync(path.resolve(path1), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(path2), 'utf-8');
  console.log(data1, data2);
};