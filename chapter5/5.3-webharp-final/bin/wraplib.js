#!/usr/bin/env node

const fs = require('fs');

const file = process.argv[2];
const name = process.argv[3];
const errMsg = `wrapper failed, file: ${file} name: ${name}`;
const inWinMsg = // eslint-disable-line
    `wrapper: window.${name} exists; exporting it.`;

const debug = true;
const debugCode = debug
    ? `console.log('wraplib ${file} ${name}', typeof window.${name})`
    : '';

const code = fs.readFileSync(file); // .toString().replace(/.use strict.;/g, '')

const wrapper = `// Programmatically created by wraplib.js
if (window.${name}) {
  console.log("${inWinMsg}")
} else {
  function wrap () {
    ${code}
  }
  wrap.call(window)
}
const result = window.${name}
if (!result) throw Error("${errMsg}")
${debugCode}
export default result
`;

process.stdout.write(wrapper);