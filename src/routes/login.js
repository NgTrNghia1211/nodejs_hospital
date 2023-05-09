var express = require('express');
var router = express.Router();
const route = require('.');

const LoginController = require('../app/Controllers/LoginController');

router.get('/', LoginController.show);

router.post('/', LoginController.checkLogin);


module.exports = router;