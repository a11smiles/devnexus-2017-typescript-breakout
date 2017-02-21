var request = require('supertest');
var expect = require('chai').expect;

describe('loading express', function () {
    var server;

    beforeEach(function (done) {
        delete require.cache[require.resolve('../server')];
        server = require('../server');
        done();
    });

    afterEach(function (done) {
        server.close(done);
    });

    it('responds to /', function (done) {
        request(server).get('/')
            .expect(200, (err, resp) => {
                expect(resp.header['content-type']).to.equal('text/html; charset=UTF-8');
                expect(resp.header['access-control-allow-origin']).to.equal('*');
                expect(resp.header['access-control-allow-methods']).to.equal('GET,POST');
                expect(resp.header['access-control-allow-headers']).to.equal('X-Requested-With,content-type,Authorization');
                done();
            });
    });
});