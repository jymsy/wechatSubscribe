var https = require('https');
var _ = require('lodash');
var accessToken = require('./components/accessToken');

var start
var url = 'https://www.gomemyc.com/api/v2/loans/getLoanWithPage?&pageSize=6&status=SCHEDULED&minDuration=0&maxDuration=3&minRate=0&maxRate=100&currentPage=1&product=';


setInterval(function() {
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
					accessToken.getAccessToken(function(token) {
						if (token) {
							console.log(token);
						}
					});
				}
			});
		});
	}).on('error', function(e) {
		console.error(e);
	});

}, 60000);
