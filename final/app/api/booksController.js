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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
require("reflect-metadata");
var inversify_1 = require("inversify");
var express_1 = require("express");
var router = express_1.Router();
var BooksController = (function () {
    function BooksController(booksJson, booksXml) {
        this._booksJson = booksJson;
        this._booksXml = booksXml;
    }
    BooksController.prototype.getRepo = function (repo) {
        //console.log(repo);
        if (repo == null || repo === undefined || repo === 'json')
            return this._booksJson;
        else if (repo === 'xml')
            return this._booksXml;
        else
            throw 'Repository not found.';
    };
    BooksController.prototype.Router = function () {
        var _this = this;
        router.route('/')
            .get(function (req, res) {
            //console.log(req.query);
            _this.getRepo(req.query.repo).getAll().then(function (bkArr) {
                res.json(bkArr);
            });
        });
        router.route('/:id')
            .get(function (req, res) {
            _this.getRepo(req.query.repo).get(req.params.id).then(function (bk) {
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
BooksController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject('IBook')), __param(0, inversify_1.named('json')),
    __param(1, inversify_1.inject('IBook')), __param(1, inversify_1.named('xml')),
    __metadata("design:paramtypes", [Object, Object])
], BooksController);
exports.BooksController = BooksController;
//# sourceMappingURL=booksController.js.map