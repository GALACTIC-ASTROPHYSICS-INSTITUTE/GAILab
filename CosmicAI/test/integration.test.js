// test/integration.test.js
const { exec } = require('child_process');
const assert = require('assert');

describe('Integration Tests', () => {
  it('should execute the script successfully', (done) => {
    exec('node path/to/your/script.js', (error, stdout, stderr) => {
      if (error) {
        done(error);
      }
      assert.strictEqual(stderr, '');
      assert.ok(stdout.includes('Expected output'));
      done();
    });
  });

  it('should handle errors correctly', (done) => {
    exec('node path/to/your/errorScript.js', (error, stdout, stderr) => {
      assert.ok(error);
      assert.strictEqual(stdout, '');
      assert.ok(stderr.includes('Expected error message'));
      done();
    });
  });
});
