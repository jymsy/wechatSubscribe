const MongoClient = require('mongodb').MongoClient;
module.exports = {
    db: null,
    url: 'mongodb://localhost:27017',
    /**
     * 初始化
     */
    init: function () {
        let self = this;
        if (this.db === null) {
            MongoClient.connect(this.url, function(err, client) {
                console.log("Connected successfully to server");
                self.db = client.db('gold');
            });
        }
    }
};