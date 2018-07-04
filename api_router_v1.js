let ordermController = require('./api/v1/order');
var verifyController = require('./api/v1/verify');
var sendMsgController = require('./api/v1/sendmsg');

var router = require('express').Router();

router.get('/verify', verifyController.verify);
router.get('/sendmsg', sendMsgController.sendmsg);
router.get('/order/create', ordermController.create);
module.exports = router;