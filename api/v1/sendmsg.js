var tokenUtil = require('./../../components/accessToken');
var https = require('https');

exports.sendmsg = function(req, res) {
    tokenUtil.getAccessToken(function(token){
        if (token) {
            var options = {
              hostname: 'api.weixin.qq.com',
              port: 443,
              path: '/cgi-bin/message/mass/sendall?access_token='+token,
              method: 'POST'
            };

            var req = http.request(options, function (serverFeedback) {
                if (serverFeedback.statusCode == 200) {
                    var body = "";
                    serverFeedback.on('data', function (data) { body += data; })
                                  .on('end', function () {
                                    res.send(200, body);
                                    });
                } else {
                    res.send(500, "error");
                }
            });
            req.write(data + "\n");
            req.end();  
            res.send(token);
        } else {
            res.send(500, 'error');
        }
        
    });
    
};