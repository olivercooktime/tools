import fs from 'fs';
import path from 'path';
import {exiftool} from 'exiftool-vendored';

const resourceFiles = fs.readdirSync(path.resolve('./source'));
const distFiles = fs.readdirSync(path.resolve('./dist'));
let index = 0;
for (const filename of resourceFiles) {
  const resourcePath = path.resolve('./source', filename);
  const distPath = path.resolve('./dist', distname(filename));
  const rTime = fs.statSync(resourcePath).mtime;
  
  await exiftool.write(distPath, { AllDates: rTime.toISOString().split('.')[0] });
  console.log(index++);
}
exiftool.end();

function distname (filename) {
  const [name, ext] = filename.split('.');
  return `${name}_batch.${ext}` ;
}

console.log('done');
