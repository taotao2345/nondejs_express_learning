var hoge = require('../../lib/hoge');

describe('hoge', function() {
  it('hogehoge test', function(done) {
    var result = hoge('hoge');
    result.should.equal('foo');
    result = hoge('tata');
    result.should.equal('var');
    done();
  });
});
