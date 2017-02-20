var booksData = [
    {
        id: '1491929480',
        name: 'Introduction to JavaScript Object Notation: A To-the-Point Guide to JSON',
        author: 'Lindsay Bassett',
        publishedDate: new Date('2015-08-20'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51Td98yZa7L._SX379_BO1,204,203,200_.jpg'
    },
    {
        id: '1519158416',
        name: 'Learn JSON In A DAY: The Ultimate Crash Course to Learning the Basics of JSON In No Time',
        author: 'Acodemy',
        publishedDate: new Date('2015-11-11'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/41HMXJ%2BBdUL._SX331_BO1,204,203,200_.jpg'
    },
    {
        id: '1534628509',
        name: 'Json: Main principals',
        author: 'David V.',
        publishedDate: new Date('2016-06-29'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51np6bd9ZKL._SX331_BO1,204,203,200_.jpg'
    },
    {
        id: '1484202031',
        name: 'Beginning JSON',
        author: 'Ben Smith',
        publishedDate: new Date('2015-02-25'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51Ks2HIN1FL._SX348_BO1,204,203,200_.jpg'
    },
    {
        id: '154122812X',
        name: 'JSON Book: Easy Learning of JavaScript Standard Object Notation',
        author: 'Steven Keller',
        publishedDate: new Date('2016-12-28'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/41VCt9i6WSL._SX331_BO1,204,203,200_.jpg'
    },
    {
        id: '1593275404',
        name: 'The Principles of Object-Oriented JavaScript',
        author: 'Nicholas C. Zakas',
        publishedDate: new Date('2014-02-23'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51F2KSDxGwL._SX376_BO1,204,203,200_.jpg'
    },
    {
        id: '1484218620',
        name: 'JSON Quick Syntax Reference',
        author: 'Wallace Jackson',
        publishedDate: new Date('2016-05-19'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/41OHYQMvWcL._SX328_BO1,204,203,200_.jpg'
    },
    {
        id: '1449358322',
        name: 'JSON at Work: Practical Data Integration for the Web',
        author: 'Tom Marrs',
        publishedDate: new Date('2017-05-25'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51bdXCQGRLL._SX379_BO1,204,203,200_.jpg'
    },
    {
        id: '0596801688',
        name: 'RESTful Web Services Cookbook: Solutions for Improving Scalability and Simplicity',
        author: 'Subbu Allamraju',
        publishedDate: new Date('2010-03-14'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51vmsDXxxrL._SX377_BO1,204,203,200_.jpg'
    },
    {
        id: '1785287176',
        name: 'JavaScript Projects for Kids',
        author: 'Syed Omar Faruk Towaha',
        publishedDate: new Date('2016-01-30'),
        cover: 'https://images-na.ssl-images-amazon.com/images/I/51cX4WXui5L._SX404_BO1,204,203,200_.jpg'
    }
];

function Books() { }

Books.prototype.getAll = function () {
    return booksData;
};

Books.prototype.get = function (id) {
    return booksData.filter((b) => { return b.id == id; })[0];
};

module.exports = Books;