"use strict";
var inversify_config_1 = require("../../inversify.config");
var express_1 = require("express");
var router = express_1.Router();
var BooksController = (function () {
    function BooksController() {
        this._books = inversify_config_1.default.get('IBook');
    }
    BooksController.prototype.Router = function () {
        var _this = this;
        router.route('/')
            .get(function (req, res) {
            _this._books.getAll().then(function (bkArr) {
                res.json(bkArr);
            });
        });
        router.route('/:id')
            .get(function (req, res) {
            _this._books.get(req.params.id).then(function (bk) {
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