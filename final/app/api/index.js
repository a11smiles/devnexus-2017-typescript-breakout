"use strict";
var inversify_config_1 = require("../../inversify.config");
var express_1 = require("express");
var router = express_1.Router();
// /api
router.get('/', function (req, res) {
    res.end();
});
var booksController = inversify_config_1.default.get('BooksController');
router.use('/books', booksController.Router());
exports.ApiRoutesController = router;
//# sourceMappingURL=index.js.map