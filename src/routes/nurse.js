var express = require('express');
var router = express.Router();
const route = require('.');

const NurseController = require('../app/Controllers/NurseController');
const AuthMiddleware = require('../app/Middleware/AuthMiddleware');

router.get('/:id', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkNurse, NurseController.showNurse);


module.exports = router;