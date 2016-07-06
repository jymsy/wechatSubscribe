
var verifyController    = require('./api/v1/verify');

var router            =  require('express').Router();

router.get('/verify', verifyController.verify);
module.exports = router;