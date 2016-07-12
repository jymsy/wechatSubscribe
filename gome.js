var https = require('https');
var _ = require('lodash');
var config = require('./define');
var WechatAPI = require('wechat-api');

var url = 'https://www.gomemyc.com/api/v2/loans/getLoanWithPage?&pageSize=6&status=SCHEDULED&minDuration=0&maxDuration=3&minRate=0&maxRate=100&currentPage=1&product=';

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

var checkGome = function() {
    https.get(url, function(res) {
    var results = '';
    res.on('data', function(chunk) {
      results += chunk;
    });
    res.on('end', function() {
      var loans = JSON.parse(results);
      _.forIn(loans.results, function(value) {
        if (value.rate == 550 &&
          (value.status == 'SCHEDULED' || value.status == 'OPENED')) {
          var timeOpen = new Date(value.timeOpen);
          var date = timeOpen.getHours() + ':' + timeOpen.getMinutes() + ':' + timeOpen.getSeconds();
          console.log(value.title + ' ' + date);
          var api = new WechatAPI(config.appId, config.appSecret);
          api.sendTemplate(config.testUid, config.templateId, '', getData(value.title, date), function(err, result) {
              console.log(result);
          });
        }
      });
    });
  }).on('error', function(e) {
    console.error(e);
  });
}

checkGome();

setInterval(checkGome, 60000);

