"use strict";
var inversify_1 = require("inversify");
var books_1 = require("./app/data/xml/books");
var Kernel = new inversify_1.Container();
Kernel.bind('IBook').to(books_1.Books);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Kernel;
//# sourceMappingURL=inversify.config.js.map