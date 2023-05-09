var express = require('express');
var router = express.Router();
const route = require('.');

const RecordController = require('../app/Controllers/RecordController');

const AuthMiddleware = require('../app/Middleware/AuthMiddleware');

//! =============================================================================
router.get('/hosodonthuoc/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.hosodonthuocNew);

router.post('/hosodonthuoc/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.submitNewHosodonthuoc);

//! =============================================================================
router.get('/hosokham/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.hosokhamNew);

router.post('/hosokham/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.submitNewHosokham);

//! =============================================================================
router.get('/hosoxetnghiem/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.hosoxetnghiemNew);

router.post('/hosoxetnghiem/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.submitNewHosoxetnghiem);

//! =============================================================================

router.get('/hosonhapvien/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.hosonhapvienNew);

router.post('/hosonhapvien/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.submitNewHosonhapvien);

router.post('/hosonhapvien/ngayxuatvien/:id', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, RecordController.changeDateHosonhapvien);


//router.get('/hosoxetnghiem/new

//router.get('/hosonhapvien/new

module.exports = router;