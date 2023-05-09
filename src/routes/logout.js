var express = require('express');
var router = express.Router();
const route = require('.');

const LoginController = require('../app/Controllers/LoginController');

router.get('/', LoginController.logout);



module.exports = router;