var express = require('express');
var router = express.Router();
const route = require('.');

const HomeController = require('../app/Controllers/HomeController');
const AuthMiddleware = require('../app/Middleware/AuthMiddleware');
router.get('/', AuthMiddleware.checkUser, HomeController.show);


module.exports = router;