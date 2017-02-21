var expect = require('chai').expect;
var Books = require('../../../../app/data/json/books').Books;

describe('DATA (json): books', function () {

    describe('getAll', function () {
        it('should return a list of all books', function (done) {
            var books = new Books();
            books.getAll().then((bkArr) => {
                expect(bkArr).to.be.instanceOf(Array);
                expect(bkArr).to.have.lengthOf(10);
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

    describe('get', function () {
        it('should return a single book', function (done) {
            var books = new Books();
            books.get('1491929480').then((bk) => {
                expect(bk).to.not.be.instanceOf(Array);
                expect(bk.author).to.equal('Lindsay Bassett');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return null', function (done) {
            var books = new Books();
            books.get('5').then((bk) => {
                expect(bk).to.be.undefined;
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

});