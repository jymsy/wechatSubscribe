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
            res.send(token);
        } else {
            res.send('error');
        }
        
    });
    
};