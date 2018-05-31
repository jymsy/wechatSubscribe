let detailItemController = require('./api/v1/detailItem');
var verifyController    = require('./api/v1/verify');
var sendMsgController = require('./api/v1/sendmsg');

var router            =  require('express').Router();

router.get('/verify', verifyController.verify);
router.get('/sendmsg', sendMsgController.sendmsg);
router.get('/createItem', detailItemController.create);
module.exports = router;