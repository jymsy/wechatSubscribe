let mongo = require('../../components/mongo');
module.exports = {
    create: function (req, res) {
        let query = req.query;
        let action = query.action;
        let price = query.price;
        let weight = query.weight;
        mongo.db.collection('order').insert({
            action: action,
            price: price,
            weight: weight,
            billId: query.billId
        }, function (err, result) {
            if (err === null) {
                res.status(200).json({});
            } else {
                res.status(500).json({msg: err.message});
            }
        });
    }
};