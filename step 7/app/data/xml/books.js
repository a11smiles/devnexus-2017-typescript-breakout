"use strict";
var fs = require("fs");
var xml2js = require("xml2js");
var books_1 = require("../interfaces/books");
var Books = (function () {
    function Books() {
    }
    Books.prototype.readBooks = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs.readFile(__dirname + '/data.xml', function (err, data) {
                if (err)
                    reject(err);
                else {
                    var parser = new xml2js.Parser();
                    parser.parseString(data, function (err, result) {
                        if (err)
                            reject(err);
                        else {
                            var formatted = _this.formatData(result);
                            resolve(formatted);
                        }
                    });
                }
            });
        });
    };
    Books.prototype.formatData = function (data) {
        var books = [];
        data.books.book.forEach(function (el) {
            var book = new books_1.Book();
            book.id = el["$"].id;
            book.name = el.name[0];
            book.author = el.author[0];
            book.publishedDate = new Date(el.publishedDate[0]);
            book.cover = el.cover[0];
            books.push(book);
        });
        return books;
    };
    Books.prototype.get = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.readBooks().then(function (data) {
                var found = data.filter(function (b) { return b.id == id; })[0];
                resolve(found);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    Books.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.readBooks().then(function (data) {
                resolve(data);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    return Books;
}());
exports.Books = Books;
//# sourceMappingURL=books.js.map