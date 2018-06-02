module.exports = {
    create: function (req, res) {
        let query = req.query;
        let action = query.action;
        let price = query.price;
        let weight = query.weight;

        res.status(200).json({data: price});
    }
};