
var verifyController    = require('./api/v1/verify');
var sendMsgController = require('./api/v1/sendmsg');

var router            =  require('express').Router();

router.get('/verify', verifyController.verify);
router.get('/sendmsg', sendMsgController.sendmsg);
module.exports = router;