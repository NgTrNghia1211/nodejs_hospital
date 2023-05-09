var express = require('express');
var router = express.Router();
const route = require('.');

const PatientController = require('../app/Controllers/PatientController');

const AuthMiddleware = require('../app/Middleware/AuthMiddleware');


//? create a new Patient
router.get('/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, PatientController.createView);
router.post('/new', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, PatientController.createNewPatient);

//? view patient info in detail
router.get('/:id', AuthMiddleware.checkUser, PatientController.show);

//? edit patient info
router.get('/edit/:id', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, PatientController.editView);
router.put('/edit/:id', AuthMiddleware.verifyToken, AuthMiddleware.checkUser, AuthMiddleware.checkDoctor, PatientController.putEdit);


module.exports = router;