var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);      
    })
    it('double done', function(done) {
      setImmediate(done);
      setImmediate(done);
    })
    it('should complete this test', function(done) {
      return new Promise(function (resolve) {
        assert.ok(true);
        resolve();
      }).then(done);
    })
    it('should return -1 when the value is not present', function() {
      [1, 2, 3].indexOf(5).should.equal(-1);      
    })
  })
})
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      done('error');
    })
  })
})