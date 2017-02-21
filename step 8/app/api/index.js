"use strict";
var express_1 = require("express");
var booksController_1 = require("./booksController");
var router = express_1.Router();
// /api
router.get('/', function (req, res) {
    res.end();
});
var books = new booksController_1.BooksController();
router.use('/books', books.Router());
exports.ApiRoutesController = router;
//# sourceMappingURL=index.js.map