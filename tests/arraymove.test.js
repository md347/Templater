const assert = require('assert');
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
  if (id === 'obsidian') return { TFile: class {}, Notice: class {} };
  return originalRequire.apply(this, arguments);
};
process.env.TS_NODE_COMPILER_OPTIONS = JSON.stringify({ module: 'commonjs' });
require('ts-node/register/transpile-only');
const { arraymove } = require('../src/utils/Utils');

const arr = [1,2,3,4];
arraymove(arr,0,2);
assert.deepStrictEqual(arr,[2,3,1,4]);

const arr2 = [1,2,3,4];
arraymove(arr2,3,0);
assert.deepStrictEqual(arr2,[4,1,2,3]);

console.log('arraymove tests passed');
