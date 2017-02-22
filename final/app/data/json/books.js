"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("reflect-metadata");
var inversify_1 = require("inversify");
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
Books = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Books);
exports.Books = Books;
//# sourceMappingURL=books.js.map