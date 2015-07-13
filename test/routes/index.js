'use strict';

var request = require('supertest'),
    app = require('../../app'),
    req = request(app);

describe('GET /index', function() {

  describe('/', function() {
    it('shoud response text with responceCode200.', function(done) {
      var url = '/';
      req.get(url).end(function(err, ret) {
        var res = ret.res,
            statusCode = res.statusCode;

        statusCode.should.equal(200);
        done();
      });
    });
  });

});
