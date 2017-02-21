var Books = require('../data/books');

module.exports = function (app, express) {
    var router = express.Router();

    router.route('/books')

        .get(function (req, res) {
            var books = new Books();
            res.json(books.getAll());
        });

    router.route('/books/:id')

        .get(function (req, res) {
            var books = new Books();
            var bookObj = books.get(req.params.id);

            if (bookObj == null || bookObj === undefined) {
                res.sendStatus(404);
            } else {
                res.json(bookObj);
            }
        });

    return router;
}