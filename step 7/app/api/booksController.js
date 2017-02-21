"use strict";
var express_1 = require("express");
var books_1 = require("../data/json/books");
var router = express_1.Router();
var BooksController = (function () {
    function BooksController() {
    }
    BooksController.prototype.Router = function () {
        router.route('/')
            .get(function (req, res) {
            var books = new books_1.Books();
            books.getAll().then(function (bkArr) {
                res.json(bkArr);
            });
        });
        router.route('/:id')
            .get(function (req, res) {
            var books = new books_1.Books();
            books.get(req.params.id).then(function (bk) {
                if (bk == null || bk === undefined) {
                    res.sendStatus(404);
                }
                else {
                    res.json(bk);
                }
            });
        });
        return router;
    };
    return BooksController;
}());
exports.BooksController = BooksController;
//# sourceMappingURL=booksController.js.map