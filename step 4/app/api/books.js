var Books = require('../data/books');

module.exports = function (app, express) {
    var router = express.Router();

    router.route('/books')

        .get(function (req, res) {
            var books = new Books();
            books.getAll().then((bkArr) => {
                res.json(bkArr);
            });
        });

    router.route('/books/:id')

        .get(function (req, res) {
            var books = new Books();
            books.get(req.params.id).then((bk) => {
                if (bk == null || bk === undefined) {
                    res.sendStatus(404);
                } else {
                    res.json(bk);
                }
            });
        });

    return router;
}