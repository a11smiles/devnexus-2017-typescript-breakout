var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('supertest');
var Books = require('../../../app/data/books');

describe('API: books', function () {
    var server;
    var booksData;

    before(function () {
        booksData = [
            {
                id: '1',
                name: 'Sample Book 1',
                author: 'George Washington',
                publishedDate: new Date(),
                cover: 'blank.jpg'
            },
            {
                id: '2',
                name: 'Sample Book 2',
                author: 'Abraham Lincoln',
                publishedDate: new Date(),
                cover: 'blank.jpg'
            },
            {
                id: '3',
                name: 'Sample Book 3',
                author: 'Johnny Appleseed',
                publishedDate: new Date(),
                cover: 'blank.jpg'
            }
        ];
    });

    beforeEach(function (done) {
        delete require.cache[require.resolve('../../../server')];
        server = require('../../../server');
        done();
    });

    afterEach(function (done) {
        server.close(done);
    });


    describe('GET /books', function () {
        var getAllStub;

        before(function () {
            getAllStub = sinon.stub(Books.prototype, 'getAll', () => {
                return new Promise((resolve, reject) => {
                    resolve(booksData);
                })
            });
        });

        after(function () {
            getAllStub.restore();
        });

        it('should return a list of all books', function (done) {
            request(server).get('/api/books')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var bkArr = resp.body;
                    expect(bkArr).to.have.lengthOf(3);
                    done();
                });
        });
    });

    describe('GET /books/:id', function () {
        var getStub;

        before(function () {
            getStub = sinon.stub(Books.prototype, 'get', (id) => {
                return new Promise((resolve, reject) => {
                    var book = booksData.filter((b) => { return b.id == id; })[0];
                    resolve(book);
                })
            });
        });

        after(function () {
            getStub.restore();
        });

        it('should return a single book', function (done) {
            request(server).get('/api/books/1')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.not.be.empty;

                    var bk = resp.body;
                    expect(bk).to.not.be.instanceOf(Array);
                    expect(bk.author).to.equal('George Washington');
                    done();
                });
        });

        it('should return null', function (done) {
            request(server).get('/api/books/5')
                .expect(200, (err, resp) => {
                    expect(resp.body).to.be.empty;
                    done();
                });
        });
    });

});
