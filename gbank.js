var https = require('https');
var _ = require('lodash');
var config = require('./define');
var WechatAPI = require('wechat-api');

var url = 'https://www.g-banker.com/info/price';

var getData = function(name, time) {
  return {
    name: {
      value: name
    },
    time: {
      value: time
    }
  };
};

var parseJson = function(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return;
  }
};

var isValidLoan = function(value) {
  if ((value.rate >= 550 && value.rate <= 580) &&
    (value.status == 'SCHEDULED' || value.status == 'OPENED')) {
    return true;
  } else {
    return false;
  }
};

var api = new WechatAPI(config.appId, config.appSecret);

var checkGbank = function() {
  https.get(url, function(res) {
    var results = '';
    res.on('data', function(chunk) {
      results += chunk;
    });
    res.on('end', function() {
      var obj = parseJson(results);
      console.log(obj);
    });
  }).on('error', function(e) {
    var now = new Date();
    console.log('time:' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
    console.error(e);
  });
};

checkGbank();

setInterval(checkGbank, 60000);