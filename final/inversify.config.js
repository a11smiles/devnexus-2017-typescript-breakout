"use strict";
var inversify_1 = require("inversify");
var booksController_1 = require("./app/api/booksController");
var books_1 = require("./app/data/json/books");
var books_2 = require("./app/data/xml/books");
var Kernel = new inversify_1.Container();
Kernel.bind('IBook').to(books_1.Books).whenTargetNamed('json');
Kernel.bind('IBook').to(books_2.Books).whenTargetNamed('xml');
Kernel.bind('BooksController').to(booksController_1.BooksController);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Kernel;
//# sourceMappingURL=inversify.config.js.map