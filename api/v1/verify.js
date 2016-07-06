var token = "jymsynb"

var crypto = require('crypto');

exports.verify = function(req, res) {
    var query = req.query;
    var signature = query.signature;
    var timestamp = query.timestamp;
    var nonce = query.nonce;
    var echostr = query.echostr;
    var sortArr = [token, timestamp, nonce];
    var verifyStr = sortArr.sort().join('');

    var sha1 = crypto.createHash('sha1');
    sha1.update(verifyStr);
    if (sha1.digest('hex') == signature) {
        res.send(echostr);
    } else {
        res.send('error');
    }
    
};
