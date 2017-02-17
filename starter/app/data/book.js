module.exports = function() {
    this.getAll = function() {
        return 'all';
    };

    this.get = function(id) {
        return 'id: ' + id;
    }
}

