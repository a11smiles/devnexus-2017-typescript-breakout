var Book = require('../data/book');

module.exports = function(app, express) {
    var router = express.Router();

    router.route('/books')

        .get(function(req, res) {
            var book = new Book();
            res.json(book.getAll());
        });

    router.route('/books/:id')

        .get(function(req, res) {
            var book = new Book();
            res.json(book.get(req.params.id));
        });

    return router;
}