"use strict";
var loadJsonFile = require("load-json-file");
var Books = (function () {
    function Books() {
    }
    Books.prototype.get = function (id) {
        return new Promise(function (resolve, reject) {
            loadJsonFile(__dirname + '/data.json').then(function (json) {
                var found = json.filter(function (b) { return b.id == id; })[0];
                resolve(found);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    Books.prototype.getAll = function () {
        return new Promise(function (resolve, reject) {
            loadJsonFile(__dirname + '/data.json').then(function (json) {
                resolve(json);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    return Books;
}());
exports.Books = Books;
//# sourceMappingURL=books.js.map