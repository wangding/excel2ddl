const test = require('node:test'),
      assert = require('assert');

test('synchronous passing test', () => {
  assert.strictEqual(1, 1);
})
