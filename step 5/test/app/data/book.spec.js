var expect = require('chai').expect;
var Book = require('../../../app/data/book');

describe('DATA (json): books', function () {

    describe('getAll', function () {
        it('should return a list of all books', function (done) {
            var book = new Book();
            book.getAll().then((books) => {
                expect(books).to.be.instanceOf(Array);
                expect(books).to.have.lengthOf(10);
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

    describe('get', function () {
        it('should return a single book', function (done) {
            var book = new Book();
            book.get('1491929480').then((found) => {
                expect(found).to.not.be.instanceOf(Array);
                expect(found.author).to.equal('Lindsay Bassett');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return null', function (done) {
            var book = new Book();
            book.get('5').then((found) => {
                expect(found).to.be.undefined;
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

});
