var tokenUtil = require('./../../components/accessToken');
var https = require('https');

exports.sendmsg = function(req, res) {
    tokenUtil.getAccessToken(function(token){
        if (token) {
            console.log(token);
            var options = {
              hostname: 'api.weixin.qq.com',
              port: 443,
              path: '/cgi-bin/message/mass/sendall?access_token='+token,
              method: 'POST'
            };

            var data = '{"filter":{"is_to_all":true},"text":{"content":"CONTENT"},"msgtype":"text"}';

            var post = https.request(options, function (serverFeedback) {
                serverFeedback.setEncoding('utf8');
                if (serverFeedback.statusCode == 200) {
                    console.log('getback');
                    var body = "";
                    serverFeedback.on('data', function(data) {
                                body += data;
                                console.log(data);
                            }).on('end', function () {
                                res.send(200, body);
                           });
                } else {
                    res.send(500, "error");
                }
            });
            post.write(data);
            post.on('error', function(e) {
                console.error(e);
            });
            post.end();

            // res.send(token);
        } else {
            res.send(500, 'error');
        }
        
    });
    
};