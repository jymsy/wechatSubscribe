var token = "jymsynb"

exports.verify = function(req, res) {
    var query = req.query;
    var signature = query.signature;
    var timestamp = query.timestamp;
    var nonce = query.nonce;
    var echostr = query.echostr;
    var sortArr = [token, timestamp, nonce];
    var verifyStr = sortArr.sort().join('');

    console.log(verifyStr);
    if (verifyStr == signature) {
        res.send(echostr);
    } else {
        res.send('error');
    }
    
};
