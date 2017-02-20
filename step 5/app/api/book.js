var Book = require('../data/book');

module.exports = function (app, express) {
    var router = express.Router();

    router.route('/books')

        .get(function (req, res) {
            var book = new Book();
            book.getAll().then((books) => {
                res.json(books);
            });
        });

    router.route('/books/:id')

        .get(function (req, res) {
            var book = new Book();
            book.get(req.params.id).then((found) => {
                if (found == null || found === undefined) {
                    res.sendStatus(404);
                } else {
                    res.json(found);
                }
            });
        });

    return router;
}