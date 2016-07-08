
var define = require('../define');
var https = require('https');

exports.getAccessToken = function(callback) {
    var url = define.tokenUrl;
    url = url.replace("APPID", define.appId);
    url = url.replace("APPSECRET", define.appSecret);

    console.log(url);

    https.get(url, function(res){
        console.log('statusCode: ', res.statusCode);
        var resData = [];
        res.on("data", function(chunk){
            resData.push(chunk);
        }).on("end", function(){
            var ret = JSON.parse(resData.join(""));
            if(!ret.errcode) {
                console.log(ret.access_token);
                callback(ret.access_token);
            } else {
                console.error(ret.errmsg);
                callback(false);
            }
        });
    }).on('error',function(e) {
        console.error(e);
        callback(false);
    });
};