import assert from 'node:assert/strict';
import { test } from 'node:test';
import { supportedNode } from './check-node.mjs';

test('reject affected, EOL, untested major and prerelease runtimes', () => {
  for (const v of ['20.20.0', '22.23.3', '24.17.0', '24.22.0', '24.22.1-rc.1', '26.12.1', 'garbage']) {
    assert.equal(supportedNode(v), false, v);
  }
});
test('accept the fixed baseline and subsequent Node 24 patches', () => {
  for (const v of ['24.22.1', '24.22.2', '24.23.0']) assert.equal(supportedNode(v), true, v);
});
